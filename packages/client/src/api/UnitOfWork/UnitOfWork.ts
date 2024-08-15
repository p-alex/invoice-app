import InvoiceRepository from "../invoice/invoice.repository";
import InvoiceItemRepository from "../invoiceItem/invoiceItem.repository";
import Storage from "../Storage";

class UnitOfWork {
  invoice: InvoiceRepository;
  invoiceItem: InvoiceItemRepository;
  constructor(private readonly _storage: Storage) {
    this.invoice = new InvoiceRepository(this._storage);
    this.invoiceItem = new InvoiceItemRepository(this._storage);
  }
}

export default UnitOfWork;
