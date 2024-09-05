import { InvoiceItemType } from "../../entities/InvoiceItem";
import Storage from "../Storage";

class InvoiceItemRepository {
  private readonly _key: string;

  constructor(private readonly _storage: Storage) {
    this._key = "invoiceItems";
  }

  getAll() {
    const invoiceItems = this._storage.getItem<InvoiceItemType[]>(this._key);
    if (!invoiceItems) {
      this._storage.setItem(this._key, []);
      return [];
    }
    return invoiceItems;
  }

  getAllByInvoiceId(invoiceId: string) {
    const invoiceItems = this.getAll();
    const filteredInvoices = invoiceItems.filter((invoice) => invoice.invoice_id === invoiceId);
    return filteredInvoices;
  }

  saveMany(invoiceItems: InvoiceItemType[]) {
    const currentInvoiceItems = this.getAll();
    const newInvoiceItems = [...currentInvoiceItems, ...invoiceItems];
    this._storage.setItem(this._key, newInvoiceItems);
  }

  deleteOne(id: string) {
    const invoiceItems = this.getAll();
    if (!invoiceItems) return false;
    const newInvoices = invoiceItems.filter((item) => item.id !== id);
    this._storage.setItem(this._key, newInvoices);
    return true;
  }
}

export default InvoiceItemRepository;
