import LocalStorage from "./LocalStorage";

import InvoiceController from "./controllers/invoice.controller";
import InvoiceItemController from "./controllers/invoiceItem.controller";

import InvoiceRepository from "./repositories/invoice.repository";
import InvoiceItemRepository from "./repositories/invoiceItem.repository";

import InvoiceService from "./services/invoice.service";
import InvoiceItemService from "./services/invoiceItem.service";

// Database
const localStorage = new LocalStorage();

// Repositories
const invoiceRepository = new InvoiceRepository(localStorage);
const invoiceItemRepository = new InvoiceItemRepository(localStorage);

// Services
const invoiceItemService = new InvoiceItemService(invoiceItemRepository);
const invoiceService = new InvoiceService(invoiceRepository, invoiceItemRepository);

// Controllers
const invoiceController = new InvoiceController(invoiceService);
const invoiceItemController = new InvoiceItemController(invoiceItemService);

// Controller Types
export type InvoiceControllerType = typeof invoiceController;
export type InvoiceItemControllerType = typeof invoiceItemController;

export { invoiceController, invoiceItemController };
