import { InvoiceItemType } from "../../entities/InvoiceItem";
import InvoiceItemRepository from "./invoiceItem.repository";

class InvoiceItemService {
  constructor(private readonly _invoiceItemRepository: InvoiceItemRepository) {}

  saveMany(invoiceItems: InvoiceItemType[]) {
    this._invoiceItemRepository.saveMany(invoiceItems);
    return true;
  }
}

export default InvoiceItemService;
