import { InvoiceType } from "../../entities/Invoice";
import Storage from "../Storage";

class InvoiceRepository {
  private readonly _key: string;

  constructor(private readonly _storage: Storage) {
    this._key = "invoices";
  }

  findAll() {
    const invoices = this._storage.getItem<InvoiceType[]>(this._key);
    if (!invoices) {
      this._storage.setItem(this._key, []);
      return [] as InvoiceType[];
    }
    return invoices;
  }

  findOneById(id: string) {
    const invoices = this.findAll();
    for (let i = 0; i < invoices?.length; i++) {
      if (invoices[i].id === id) return invoices[i];
    }
    return null;
  }

  createOne = (invoice: InvoiceType) => {
    let invoices = this.findAll();
    if (invoices === null) {
      this._storage.setItem(this._key, []);
      invoices = [];
    }
    const newInvoices = [...invoices, invoice];
    this._storage.setItem(this._key, newInvoices);
    return invoice;
  };
}

export default InvoiceRepository;
