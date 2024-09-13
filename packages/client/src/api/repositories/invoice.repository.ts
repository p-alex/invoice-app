import { InvoiceType } from "../../entities/Invoice";
import Storage from "../Storage";

class InvoiceRepository {
  private readonly _key: string;

  constructor(private readonly _storage: Storage) {
    this._key = "invoices";
  }

  getAll() {
    const invoices = this._storage.getItem<InvoiceType[]>(this._key);

    if (!invoices) {
      this._storage.setItem(this._key, []);
      return [] as InvoiceType[];
    }

    return invoices;
  }

  getById(id: string) {
    const invoices = this.getAll();
    for (let i = 0; i < invoices?.length; i++) {
      if (invoices[i].id === id) return invoices[i];
    }
    return null;
  }

  saveOne(invoice: InvoiceType) {
    let invoices = this.getAll();
    if (invoices === null) {
      this._storage.setItem(this._key, []);
      invoices = [];
    }
    const newInvoices = [...invoices, invoice];
    this._storage.setItem(this._key, newInvoices);
    return invoice;
  }

  update(invoice: InvoiceType) {
    const invoices = this.getAll();
    const newInvoices = invoices.map((currentInvoice) => {
      if (currentInvoice.id === invoice.id) {
        return invoice;
      }
      return currentInvoice;
    });
    this._storage.setItem(this._key, newInvoices);
    return invoice;
  }

  deleteOne(invoice: InvoiceType) {
    const invoices = this.getAll();
    const newInvoices = invoices.filter((currentInvoice) => currentInvoice.id !== invoice.id);
    this._storage.setItem(this._key, newInvoices);
    return invoice;
  }
}

export default InvoiceRepository;
