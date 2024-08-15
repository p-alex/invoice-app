import InvoiceItemController from "./invoiceItem.controller";
import unitOfWork from "../UnitOfWork";

const invoiceItemController = new InvoiceItemController(unitOfWork);

export default invoiceItemController;
