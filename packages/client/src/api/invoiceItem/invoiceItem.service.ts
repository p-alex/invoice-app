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
}

export default InvoiceItemService;
