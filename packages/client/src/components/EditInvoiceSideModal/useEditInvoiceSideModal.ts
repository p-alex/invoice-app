import { useFieldArray, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import createRandomId from "../../utils/createRandomId";
import getInvoiceDueDate from "../../utils/getInvoiceDueDate";
import { EditInvoiceType } from "./EditInvoiceSideModal.schema";
import { useCallback, useEffect } from "react";
import { editInvoiceSchema } from ".";
import { InvoiceItemType } from "../../entities/InvoiceItem";
import { InvoiceType } from "../../entities/Invoice";

export interface EditInvoiceSideModalProps {
  defaultValues: { invoice: InvoiceType; invoiceItems: InvoiceItemType[] };
  handleCloseModal: () => void;
  firstFocusableButtonRef: React.RefObject<HTMLButtonElement>;
  lastFocusableButtonRef: React.RefObject<HTMLButtonElement>;
  handleUpdateInvoice: (
    invoice: InvoiceType,
    invoiceitems: InvoiceItemType[],
  ) => Promise<{ success: boolean }>;
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

  const handleSave = async () => {
    const response = await props.handleUpdateInvoice(
      getValues("invoice"),
      getValues("invoiceItems"),
    );
    if (response.success) props.handleCloseModal();
  };

  const handleSetInvoiceDate = useCallback(
    (date: Date) => {
      setValue("invoice.created_at", date.toISOString());
      const dueDate = getInvoiceDueDate(date, getValues("invoice.payment_terms"));
      setValue("invoice.due_at", dueDate.toISOString());
    },
    [getValues, setValue],
  );

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
    handleSave,
    handleAddInvoiceItem,
    handleRemoveInvoiceItem,
    handleSetInvoiceDate,
  };
}

export default useEditInvoiceSideModal;
