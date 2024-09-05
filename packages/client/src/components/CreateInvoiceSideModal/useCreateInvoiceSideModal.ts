import { useEffect, useRef } from "react";
import createRandomId from "../../utils/createRandomId";
import { createInvoiceSchema, CreateInvoiceType } from "../../entities/Invoice";
import { useFieldArray, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { CreateInvoiceSideModalProps } from "./CreateInvoiceSideModal";
import getInvoiceDueDate from "../../utils/getInvoiceDueDate";
import { InvoiceItemType } from "../../entities/InvoiceItem";

export const createInvoiceSideModal_pendingSuccessMessage =
  "Invoice was saved and sent successfully!";
export const createInvoiceSideModal_draftSuccessMessage = "Draft invoice saved!";

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

  const submit = async (invoiceData: CreateInvoiceType) => {
    const totalPrice = calculateTotalPrice(invoiceData.invoiceItems);
    invoiceData.invoice.total_price = totalPrice;

    try {
      const response = await props.handleSaveAndSend(invoiceData.invoice, invoiceData.invoiceItems);
      if (response.success) {
        reset();
        props.handleCloseModal();
        props.displayPopup(createInvoiceSideModal_pendingSuccessMessage);
        props.handleAddInvoiceToState(response.result.invoice);
        return;
      }
      props.displayPopup(response.error);
    } catch (error: any) {
      props.displayPopup(error.message);
    }
  };

  const submitAsDraft = async (invoiceData: CreateInvoiceType) => {
    invoiceData.invoice.status = "draft";

    const totalPrice = calculateTotalPrice(invoiceData.invoiceItems);
    invoiceData.invoice.total_price = totalPrice;

    try {
      const response = await props.handleSaveAsDraft(invoiceData.invoice, invoiceData.invoiceItems);
      if (response.success) {
        reset();
        props.handleCloseModal();
        props.displayPopup(createInvoiceSideModal_draftSuccessMessage);
        props.handleAddInvoiceToState(response.result.invoice);
        return;
      }
      props.displayPopup(response.error);
    } catch (error: any) {
      props.displayPopup(error.message);
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

  const calculateTotalPrice = (invoiceItems: InvoiceItemType[]) => {
    let totalPrice = 0;
    for (let i = 0; i < invoiceItems.length; i++) {
      const price = invoiceItems[i].price;
      const quantity = invoiceItems[i].quantity;
      totalPrice = totalPrice + price * quantity;
    }
    return totalPrice;
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
    submit,
    submitAsDraft,
    handleAddInvoiceItem,
    handleRemoveInvoiceItem,
    handleSetInvoiceDate,
  };
}

export default useCreateInvoiceSideModal;
