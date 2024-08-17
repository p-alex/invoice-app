import { PaymentTermsType } from "../entities/Invoice";

const getInvoiceDueDate = (invoiceDate: Date, paymentTerms: PaymentTermsType) => {
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

export default getInvoiceDueDate;
