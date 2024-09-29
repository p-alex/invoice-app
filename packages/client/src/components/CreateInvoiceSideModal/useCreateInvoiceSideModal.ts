import { useEffect, useRef } from "react";
import createRandomId from "../../utils/createRandomId";
import { useFieldArray, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import getInvoiceDueDate from "../../utils/getInvoiceDueDate";
import { createInvoiceSchema, CreateInvoiceType } from "./CreateInvoiceSideModal.schema";
import calculateInvoiceTotalPrice from "../../utils/calculateInvoiceTotalPrice";
import { InvoiceType } from "../../entities/Invoice";
import { InvoiceControllerType } from "../../api";

export interface CreateInvoiceSideModalProps {
  defaultValues?: CreateInvoiceType;
  handleCloseModal: () => void;
  handleAddInvoiceToState: (invoice: InvoiceType) => void;
  handleDisplayPopup: (message: string) => void;
  saveAndSendRequest: InvoiceControllerType["saveAndSend"];
  saveRequest: InvoiceControllerType["save"];
  firstFocusableButtonRef: React.RefObject<HTMLButtonElement>;
  lastFocusableButtonRef: React.RefObject<HTMLButtonElement>;
}

function useCreateInvoiceSideModal(props: CreateInvoiceSideModalProps) {
  const invoiceId = useRef(createRandomId());

  const { formState, control, getValues, setValue, watch, register, handleSubmit, reset } =
    useForm<CreateInvoiceType>({
      defaultValues: props.defaultValues
        ? props.defaultValues
        : {
            invoice: {
              id: invoiceId.current,
              client_name: "",
              client_email: "",
              sender_address: { street: "", city: "", post_code: "", country: "" },
              receiver_address: { street: "", city: "", post_code: "", country: "" },
              payment_terms: "Net 1 Day",
              created_at: new Date().toISOString(),
              due_at: getInvoiceDueDate(new Date(), "Net 1 Day").toISOString(),
              status: "pending",
              project_description: "",
              total_price: 0,
            },
            invoiceItems: [],
          },
      resolver: zodResolver(createInvoiceSchema),
    });

  const { fields, append, remove } = useFieldArray({
    name: "invoiceItems",
    control,
  });

  const handleSaveAndSend = async ({ invoice, invoiceItems }: CreateInvoiceType) => {
    invoice.total_price = calculateInvoiceTotalPrice(invoiceItems);
    try {
      const response = await props.saveAndSendRequest(invoice, invoiceItems);
      if (!response.success) return props.handleDisplayPopup(response.error);
      reset();
      props.handleCloseModal();
      props.handleAddInvoiceToState(response.result.savedInvoice);
      props.handleDisplayPopup(response.message);
    } catch (error: any) {
      props.handleDisplayPopup(error.message);
    }
  };

  const handleSaveAsDraft = async ({ invoice, invoiceItems }: CreateInvoiceType) => {
    invoice.status = "draft";
    invoice.total_price = calculateInvoiceTotalPrice(invoiceItems);
    try {
      const response = await props.saveRequest(invoice, invoiceItems);
      if (!response.success) return props.handleDisplayPopup(response.error);
      reset();
      props.handleCloseModal();
      props.handleAddInvoiceToState(response.result.savedInvoice);
      props.handleDisplayPopup(response.message);
    } catch (error: any) {
      props.handleDisplayPopup(error.message);
    }
  };

  const handleAddInvoiceItem = () => {
    append({
      id: createRandomId(),
      invoice_id: invoiceId.current,
      name: "",
      quantity: 1,
      price: 0,
    });
  };

  const handleRemoveInvoiceItem = (index: number) => {
    remove(index);
  };

  const handleSetInvoiceDate = (date: Date) => {
    setValue("invoice.created_at", date.toISOString());
    const dueDate = getInvoiceDueDate(date, getValues("invoice.payment_terms"));
    setValue("invoice.due_at", dueDate.toISOString());
  };

  const paymentTerms = watch("invoice.payment_terms");

  useEffect(() => {
    const dueDate = getInvoiceDueDate(
      new Date(getValues("invoice.created_at")),
      getValues("invoice.payment_terms"),
    ).toISOString();
    setValue("invoice.due_at", dueDate);
  }, [paymentTerms, getValues, setValue]);

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
    handleSaveAndSend,
    handleSaveAsDraft,
    handleAddInvoiceItem,
    handleRemoveInvoiceItem,
    handleSetInvoiceDate,
  };
}

export default useCreateInvoiceSideModal;
