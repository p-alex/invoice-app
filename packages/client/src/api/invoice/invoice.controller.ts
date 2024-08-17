import { DefaultResponse } from "../../entities/DefaultResponse";
import { InvoiceType } from "../../entities/Invoice";
import { InvoiceItemType } from "../../entities/InvoiceItem";
import UnitOfWork from "../UnitOfWork/UnitOfWork";

class InvoiceController {
  constructor(private readonly _unitOfWork: UnitOfWork) {
    this.findAll = this.findAll.bind(this);
    this.saveAndSend = this.saveAndSend.bind(this);
    this.saveAsDraft = this.saveAsDraft.bind(this);
  }

  async findAll(): Promise<DefaultResponse<InvoiceType[]>> {
    return new Promise((resolve) => {
      const invoices = this._unitOfWork.invoice.findAll();
      resolve({ success: true, result: invoices, error: "" });
    });
  }

  async saveAndSend(
    invoice: InvoiceType,
    invoiceItemList: InvoiceItemType[],
  ): Promise<DefaultResponse<InvoiceType>> {
    return new Promise((resolve) => {
      const createdInvoice = this._unitOfWork.invoice.createOne(invoice);
      this._unitOfWork.invoiceItem.createMany(invoiceItemList);
      // Send invoice
      resolve({ success: true, result: createdInvoice, error: "" });
    });
  }

  async saveAsDraft(
    invoice: InvoiceType,
    invoiceItemList: InvoiceItemType[],
  ): Promise<DefaultResponse<InvoiceType>> {
    return new Promise((resolve) => {
      const createdInvoice = this._unitOfWork.invoice.createOne(invoice);
      this._unitOfWork.invoiceItem.createMany(invoiceItemList);
      resolve({ success: true, result: createdInvoice, error: "" });
    });
  }
}

export default InvoiceController;
