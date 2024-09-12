import { InvoiceItemType } from "../../entities/InvoiceItem";
import InvoiceItemRepository from "./invoiceItem.repository";

class InvoiceItemService {
  constructor(private readonly _invoiceItemRepository: InvoiceItemRepository) {}

  getAllByInvoiceId(invoiceId: string) {
    const invoiceItems = this._invoiceItemRepository.getAllByInvoiceId(invoiceId);
    return invoiceItems;
  }

  saveMany(invoiceItems: InvoiceItemType[]) {
    this._invoiceItemRepository.saveMany(invoiceItems);
    return true;
  }

  updateMany(invoiceItems: InvoiceItemType[]) {
    return this._invoiceItemRepository.updateMany(invoiceItems);
  }

  deleteOne(invoiceItem: InvoiceItemType) {
    const deletedInvoice = this._invoiceItemRepository.deleteOne(invoiceItem);
    return deletedInvoice;
  }

  deleteManyByInvoiceId(invoiceId: string) {
    const deletedInvoices = this._invoiceItemRepository.deleteManyByInvoiceId(invoiceId);
    return deletedInvoices;
  }
}

export default InvoiceItemService;
