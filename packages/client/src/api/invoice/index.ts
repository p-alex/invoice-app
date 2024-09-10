import InvoiceItemRepository from "../invoiceItem/invoiceItem.repository";
import InvoiceItemService from "../invoiceItem/invoiceItem.service";
import LocalStorage from "../LocalStorage";
import InvoiceController from "./invoice.controller";
import InvoiceRepository from "./invoice.repository";
import InvoiceService from "./invoice.service";

const localStorage = new LocalStorage();

const invoiceRepository = new InvoiceRepository(localStorage);
const invoiceItemRepository = new InvoiceItemRepository(localStorage);

const invoiceService = new InvoiceService(invoiceRepository);
const invoiceItemService = new InvoiceItemService(invoiceItemRepository);

const invoiceController = new InvoiceController(invoiceService, invoiceItemService);

export type SaveAndSendInvoiceType = typeof invoiceController.saveAndSend;
export type SaveInvoiceAsDraftType = typeof invoiceController.saveAsDraft;
export type UpdateInvoiceType = typeof invoiceController.update;

export default invoiceController;
