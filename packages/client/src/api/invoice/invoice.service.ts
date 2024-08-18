import { InvoiceType } from "../../entities/Invoice";
import InvoiceRepository from "./invoice.repository";

class InvoiceService {
  constructor(private readonly _invoiceRepository: InvoiceRepository) {}

  getAll() {
    const invoices = this._invoiceRepository.getAll();
    return invoices;
  }

  save(invoice: InvoiceType) {
    const savedInvoice = this._invoiceRepository.save(invoice);
    return savedInvoice;
  }

  send(invoice: InvoiceType) {
    console.log(invoice.id + " was sent to the client");
    return true;
  }
}

export default InvoiceService;
