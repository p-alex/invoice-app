import unitOfWork from "../UnitOfWork";
import InvoiceController from "./invoice.controller";

const invoiceController = new InvoiceController(unitOfWork);

export type SaveAndSendInvoiceType = typeof invoiceController.saveAndSend;
export type SaveInvoiceAsDraftType = typeof invoiceController.saveAsDraft;

export default invoiceController;
