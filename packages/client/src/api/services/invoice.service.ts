import { InvoiceType } from "../../entities/Invoice";
import { InvoiceItemType } from "../../entities/InvoiceItem";
import InvoiceRepository from "../repositories/invoice.repository";
import InvoiceItemService from "./invoiceItem.service";

class InvoiceService {
  constructor(
    private readonly _invoiceRepository: InvoiceRepository,
    private readonly _invoiceItemService: InvoiceItemService,
  ) {}

  getAll() {
    const invoices = this._invoiceRepository.getAll();
    return invoices;
  }

  getById(id: string) {
    const invoice = this._invoiceRepository.getById(id);
    return invoice;
  }

  save(invoice: InvoiceType, invoiceItems: InvoiceItemType[]) {
    const savedInvoice = this._invoiceRepository.saveOne(invoice);
    this._invoiceItemService.saveMany(invoiceItems);
    return savedInvoice;
  }

  send(invoice: InvoiceType) {
    console.log(invoice.id + " was sent to the client");
    return true;
  }

  update(invoice: InvoiceType, invoiceItems: InvoiceItemType[]) {
    const updatedInvoice = this._invoiceRepository.update(invoice);
    const updatedInvoiceItems = this._invoiceItemService.updateMany(invoiceItems);
    return { updatedInvoice, updatedInvoiceItems };
  }

  delete(invoice: InvoiceType) {
    const deletedInvoice = this._invoiceRepository.deleteOne(invoice);
    this._invoiceItemService.deleteManyByInvoiceId(invoice.id);
    return deletedInvoice;
  }
}

export default InvoiceService;
