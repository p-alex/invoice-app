import { useEffect, useRef } from "react";
import createRandomId from "../../utils/createRandomId";
import { createInvoiceSchema, CreateInvoiceType } from "../../entities/Invoice";
import { useFieldArray, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { invoiceController } from "../../api";
import { CreateInvoiceSideModalProps } from "./CreateInvoiceSideModal";

function useCreateInvoiceSideModal(props: CreateInvoiceSideModalProps) {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const invoiceId = useRef(createRandomId());

  const handleGetInvoiceDueDate = (invoiceDate: Date, paymentTerms: string) => {
    const dueDate = new Date(invoiceDate.getTime());
    switch (paymentTerms) {
      case "Net 1 Day":
        dueDate.setDate(invoiceDate.getDate() + 1);
        break;
      case "Net 7 Days":
        dueDate.setDate(invoiceDate.getDate() + 7);
        break;
      case "Net 14 Days":
        dueDate.setDate(invoiceDate.getDate() + 14);
        break;
      case "Net 30 Days":
        dueDate.setDate(invoiceDate.getDate() + 30);
        break;
    }
    return dueDate;
  };

  const { formState, control, getValues, setValue, watch, register, handleSubmit, reset } =
    useForm<CreateInvoiceType>({
      defaultValues: {
        invoice: {
          id: createRandomId(),
          client_name: "",
          client_email: "",
          sender_address: { street: "", city: "", post_code: "", country: "" },
          receiver_address: { street: "", city: "", post_code: "", country: "" },
          payment_terms: "Net 1 Day",
          created_at: new Date(),
          due_at: handleGetInvoiceDueDate(new Date(), "Net 1 Day"),
          status: "pending",
          project_description: "",
        },
        invoice_item_list: [],
      },
      resolver: zodResolver(createInvoiceSchema),
    });

  const { fields, append, remove } = useFieldArray({
    name: "invoice_item_list",
    control,
  });

  const submit = async (invoiceData: CreateInvoiceType) => {
    try {
      const response = await invoiceController.createOne(
        invoiceData.invoice,
        invoiceData.invoice_item_list,
      );
      if (response.success) {
        props.handleCloseModal();
        reset();
      }
    } catch (error) {
      console.error(error);
    }
  };

  const submitAsDraft = async (invoiceData: CreateInvoiceType) => {
    invoiceData.invoice.status = "draft";
    try {
      const response = await invoiceController.createOne(
        invoiceData.invoice,
        invoiceData.invoice_item_list,
      );
      if (response.success) {
        props.handleCloseModal();
        reset();
      }
    } catch (error) {
      console.error(error);
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
    setValue("invoice.created_at", date);
    const dueDate = handleGetInvoiceDueDate(date, getValues("invoice.payment_terms"));
    setValue("invoice.due_at", dueDate);
  };

  const paymentTerms = watch("invoice.payment_terms");

  useEffect(() => {
    const dueDate = handleGetInvoiceDueDate(
      getValues("invoice.created_at"),
      getValues("invoice.payment_terms"),
    );
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
