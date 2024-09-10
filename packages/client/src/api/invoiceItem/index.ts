import LocalStorage from "../LocalStorage";
import InvoiceItemController from "./invoiceItem.controller";
import InvoiceItemRepository from "./invoiceItem.repository";
import InvoiceItemService from "./invoiceItem.service";

const localStorage = new LocalStorage();

const invoiceItemRepository = new InvoiceItemRepository(localStorage);

const invoiceItemService = new InvoiceItemService(invoiceItemRepository);

const invoiceItemController = new InvoiceItemController(invoiceItemService);

export type GetAllByInvoiceIdType = typeof invoiceItemController.getAllByInvoiceId;
export type UpdateInvoiceItemsType = typeof invoiceItemController.updateInvoiceItems;

export default invoiceItemController;
