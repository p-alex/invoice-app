import { DefaultResponse } from "../../entities/DefaultResponse";
import { InvoiceType } from "../../entities/Invoice";
import { InvoiceItemType } from "../../entities/InvoiceItem";
import HTTPResponse from "../HTTPResponse";
import InvoiceService from "../services/invoice.service";

class InvoiceController {
  constructor(private readonly _invoiceService: InvoiceService) {
    this.getAll = this.getAll.bind(this);
    this.getById = this.getById.bind(this);
    this.saveAndSend = this.saveAndSend.bind(this);
    this.save = this.save.bind(this);
    this.update = this.update.bind(this);
  }

  async getAll(): Promise<DefaultResponse<{ invoices: InvoiceType[] }>> {
    return new Promise((resolve) => {
      const invoices = this._invoiceService.getAll();
      resolve(HTTPResponse.success("Invoices found!", { invoices }));
    });
  }

  async getById(id: string): Promise<DefaultResponse<{ invoice: InvoiceType }>> {
    return new Promise((resolve, reject) => {
      const invoice = this._invoiceService.getById(id);
      if (!invoice) return reject(HTTPResponse.error("An invoice with this id does not exist"));
      resolve(HTTPResponse.success("Invoice " + id + " was found!", { invoice }));
    });
  }

  async saveAndSend(
    invoice: InvoiceType,
    invoiceItems: InvoiceItemType[],
  ): Promise<DefaultResponse<{ savedInvoice: InvoiceType; savedInvoiceItems: InvoiceItemType[] }>> {
    return new Promise((resolve) => {
      const { savedInvoice, savedInvoiceItems } = this._invoiceService.save(invoice, invoiceItems);
      this._invoiceService.send(savedInvoice);
      resolve(
        HTTPResponse.success("Invoice #" + invoice.id + " has been saved and sent!", {
          savedInvoice,
          savedInvoiceItems,
        }),
      );
    });
  }

  async send(invoice: InvoiceType): Promise<DefaultResponse<{ sentInvoice: InvoiceType }>> {
    return new Promise((resolve) => {
      const { sentInvoice } = this._invoiceService.send(invoice);
      resolve(HTTPResponse.success("Invoice #" + invoice.id + " has been sent!", { sentInvoice }));
    });
  }

  async save(
    invoice: InvoiceType,
    invoiceItems: InvoiceItemType[],
  ): Promise<DefaultResponse<{ savedInvoice: InvoiceType; savedInvoiceItems: InvoiceItemType[] }>> {
    return new Promise((resolve) => {
      const { savedInvoice, savedInvoiceItems } = this._invoiceService.save(invoice, invoiceItems);
      resolve(
        HTTPResponse.success("Invoice #" + invoice.id + " has been saved!", {
          savedInvoice,
          savedInvoiceItems,
        }),
      );
    });
  }

  async update(
    invoice: InvoiceType,
    invoiceItems: InvoiceItemType[],
  ): Promise<
    DefaultResponse<{ updatedInvoice: InvoiceType; updatedInvoiceItems: InvoiceItemType[] }>
  > {
    return new Promise((resolve) => {
      const { updatedInvoice, updatedInvoiceItems } = this._invoiceService.update(
        invoice,
        invoiceItems,
      );
      resolve(
        HTTPResponse.success("Invoice #" + invoice.id + " has been updated!", {
          updatedInvoice,
          updatedInvoiceItems,
        }),
      );
    });
  }

  async delete(invoice: InvoiceType): Promise<DefaultResponse<{ deletedInvoice: InvoiceType }>> {
    return new Promise((resolve) => {
      const deletedInvoice = this._invoiceService.delete(invoice);
      resolve(
        HTTPResponse.success("Invoice #" + invoice.id + " has been deleted!", {
          deletedInvoice,
        }),
      );
    });
  }
}

export default InvoiceController;
