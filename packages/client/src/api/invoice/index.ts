import unitOfWork from "../UnitOfWork";
import InvoiceController from "./invoice.controller";

const invoiceController = new InvoiceController(unitOfWork);

export default invoiceController;
