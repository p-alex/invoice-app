import { InvoiceType } from "../../entities/Invoice";
import InvoiceRepository from "./invoice.repository";

class InvoiceService {
  constructor(private readonly _invoiceRepository: InvoiceRepository) {}

  getAll() {
    const invoices = this._invoiceRepository.getAll();
    return invoices;
  }

  getById(id: string) {
    const invoice = this._invoiceRepository.getById(id);
    return invoice;
  }

  save(invoice: InvoiceType) {
    const savedInvoice = this._invoiceRepository.saveOne(invoice);
    return savedInvoice;
  }

  send(invoice: InvoiceType) {
    console.log(invoice.id + " was sent to the client");
    return true;
  }

  update(invoice: InvoiceType) {
    const updatedInvoice = this._invoiceRepository.update(invoice);
    return updatedInvoice;
  }

  delete(invoice: InvoiceType) {
    const deletedInvoice = this._invoiceRepository.deleteOne(invoice);
    return deletedInvoice;
  }
}

export default InvoiceService;
