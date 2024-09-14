import { InvoiceType } from "../../entities/Invoice";
import { InvoiceItemType } from "../../entities/InvoiceItem";
import InvoiceRepository from "../repositories/invoice.repository";
import InvoiceItemRepository from "../repositories/invoiceItem.repository";

class InvoiceService {
  constructor(
    private readonly _invoiceRepository: InvoiceRepository,
    private readonly _invoiceItemRepository: InvoiceItemRepository,
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
    const savedInvoiceItems = this._invoiceItemRepository.saveMany(invoiceItems);
    return { savedInvoice, savedInvoiceItems };
  }

  send(invoice: InvoiceType) {
    console.log(invoice.id + " was sent to the client");
    const updatedInvoice = this._invoiceRepository.update({ ...invoice, status: "pending" });
    return updatedInvoice;
  }

  update(invoice: InvoiceType, invoiceItems: InvoiceItemType[]) {
    const updatedInvoice = this._invoiceRepository.update(invoice);
    const updatedInvoiceItems = this._invoiceItemRepository.updateMany(invoiceItems);
    return { updatedInvoice, updatedInvoiceItems };
  }

  delete(invoice: InvoiceType) {
    const deletedInvoice = this._invoiceRepository.deleteOne(invoice);
    this._invoiceItemRepository.deleteManyByInvoiceId(invoice.id);
    return deletedInvoice;
  }
}

export default InvoiceService;
