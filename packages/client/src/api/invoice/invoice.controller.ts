import { DefaultResponse } from "../../entities/DefaultResponse";
import { InvoiceType } from "../../entities/Invoice";
import { InvoiceItemType } from "../../entities/InvoiceItem";
import HTTPResponse from "../HTTPResponse";
import InvoiceItemService from "../invoiceItem/invoiceItem.service";
import InvoiceService from "./invoice.service";

class InvoiceController {
  constructor(
    private readonly _invoiceService: InvoiceService,
    private readonly _invoiceItemService: InvoiceItemService,
  ) {
    this.getAll = this.getAll.bind(this);
    this.getById = this.getById.bind(this);
    this.saveAndSend = this.saveAndSend.bind(this);
    this.saveAsDraft = this.saveAsDraft.bind(this);
    this.update = this.update.bind(this);
  }

  async getAll(): Promise<DefaultResponse<{ invoices: InvoiceType[] }>> {
    return new Promise((resolve) => {
      const invoices = this._invoiceService.getAll();
      resolve(HTTPResponse.success({ invoices }));
    });
  }

  async getById(id: string): Promise<DefaultResponse<{ invoice: InvoiceType }>> {
    return new Promise((resolve, reject) => {
      const invoice = this._invoiceService.getById(id);
      if (!invoice) return reject(HTTPResponse.error("An invoice with this id does not exist"));
      resolve(HTTPResponse.success({ invoice }));
    });
  }

  async saveAndSend(
    invoice: InvoiceType,
    invoiceItems: InvoiceItemType[],
  ): Promise<DefaultResponse<{ invoice: InvoiceType }>> {
    return new Promise((resolve) => {
      const createdInvoice = this._invoiceService.save(invoice);
      this._invoiceItemService.saveMany(invoiceItems);
      this._invoiceService.send(createdInvoice);
      resolve(HTTPResponse.success({ invoice: createdInvoice }));
    });
  }

  async saveAsDraft(
    invoice: InvoiceType,
    invoiceItems: InvoiceItemType[],
  ): Promise<DefaultResponse<{ invoice: InvoiceType }>> {
    return new Promise((resolve) => {
      const createdInvoice = this._invoiceService.save(invoice);
      this._invoiceItemService.saveMany(invoiceItems);
      resolve(HTTPResponse.success({ invoice: createdInvoice }));
    });
  }

  async update(
    invoice: InvoiceType,
    invoiceItems: InvoiceItemType[],
  ): Promise<DefaultResponse<{ invoice: InvoiceType; invoiceItems: InvoiceItemType[] }>> {
    return new Promise((resolve) => {
      const updatedInvoice = this._invoiceService.update(invoice);
      const updatedInvoiceItems = this._invoiceItemService.updateMany(invoiceItems);
      resolve(HTTPResponse.success({ invoice: updatedInvoice, invoiceItems: updatedInvoiceItems }));
    });
  }

  async delete(invoice: InvoiceType): Promise<DefaultResponse<{ deletedInvoice: InvoiceType }>> {
    return new Promise((resolve) => {
      const deletedInvoice = this._invoiceService.delete(invoice);
      this._invoiceItemService.deleteManyByInvoiceId(invoice.id);
      resolve(HTTPResponse.success({ deletedInvoice }));
    });
  }
}

export default InvoiceController;
