import { useFieldArray, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import createRandomId from "../../utils/createRandomId";
import getInvoiceDueDate from "../../utils/getInvoiceDueDate";
import { EditInvoiceType } from "./EditInvoiceSideModal.schema";
import { useCallback, useEffect } from "react";
import { editInvoiceSchema } from ".";
import calculateInvoiceTotalPrice from "../../utils/calculateInvoiceTotalPrice";
import { InvoiceItemType } from "../../entities/InvoiceItem";
import { InvoiceType } from "../../entities/Invoice";
import { DisplayPopupType } from "../../utils/FeedbackPopupManager";
import { UpdateInvoiceType } from "../../api/invoice";

export interface EditInvoiceSideModalProps {
  defaultValues: { invoice: InvoiceType; invoiceItems: InvoiceItemType[] };
  handleCloseModal: () => void;
  handleDisplayPopup: DisplayPopupType;
  firstFocusableButtonRef: React.RefObject<HTMLButtonElement>;
  lastFocusableButtonRef: React.RefObject<HTMLButtonElement>;
  updateInvoiceRequest: UpdateInvoiceType;
  handleUpdateInvoiceStateData: (invoice: InvoiceType, invoiceItems: InvoiceItemType[]) => void;
}

function useEditInvoiceSideModal(props: EditInvoiceSideModalProps) {
  const { formState, control, getValues, setValue, watch, register, handleSubmit } =
    useForm<EditInvoiceType>({
      defaultValues: props.defaultValues,
      resolver: zodResolver(editInvoiceSchema),
    });

  const { fields, append, remove } = useFieldArray({
    name: "invoiceItems",
    control,
  });

  const handleAddInvoiceItem = () => {
    append({
      id: createRandomId(),
      invoice_id: props.defaultValues.invoice.id,
      name: "",
      quantity: 1,
      price: 0,
    });
  };

  const handleRemoveInvoiceItem = (index: number) => {
    remove(index);
  };

  const handleSetInvoiceDate = useCallback(
    (date: Date) => {
      setValue("invoice.created_at", date.toISOString());
      const dueDate = getInvoiceDueDate(date, getValues("invoice.payment_terms"));
      setValue("invoice.due_at", dueDate.toISOString());
    },
    [getValues, setValue],
  );

  const handleUpdateInvoice = async (invoiceData: EditInvoiceType) => {
    try {
      invoiceData.invoice.total_price = calculateInvoiceTotalPrice(invoiceData.invoiceItems);
      const response = await props.updateInvoiceRequest(
        invoiceData.invoice,
        invoiceData.invoiceItems,
      );
      if (response.success) {
        props.handleDisplayPopup("Invoice updated successfully!");
        props.handleCloseModal();
        props.handleUpdateInvoiceStateData(response.result.invoice, response.result.invoiceItems);
        return;
      }
      props.handleDisplayPopup(response.error);
    } catch (error: any) {
      props.handleDisplayPopup(error.message);
    }
  };

  const paymentTerms = watch("invoice.payment_terms");

  useEffect(() => {
    handleSetInvoiceDate(new Date(getValues("invoice.created_at")));
  }, [paymentTerms, getValues, handleSetInvoiceDate]);

  return {
    form: {
      formState,
      register,
      invoiceItemFields: fields,
      handleSubmit,
      setValue,
      getValues,
      watch,
    },
    handleAddInvoiceItem,
    handleRemoveInvoiceItem,
    handleSetInvoiceDate,
    handleUpdateInvoice,
  };
}

export default useEditInvoiceSideModal;
