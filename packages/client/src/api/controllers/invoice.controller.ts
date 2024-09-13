import { DefaultResponse } from "../../entities/DefaultResponse";
import { InvoiceType } from "../../entities/Invoice";
import { InvoiceItemType } from "../../entities/InvoiceItem";
import HTTPResponse from "../HTTPResponse";
import InvoiceService from "../services/invoice.service";

interface InvoiceData {
  invoice: InvoiceType;
  invoiceItems: InvoiceItemType[];
}

class InvoiceController {
  constructor(private readonly _invoiceService: InvoiceService) {
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

  async saveAndSend(invoiceData: InvoiceData): Promise<DefaultResponse<{ invoice: InvoiceType }>> {
    return new Promise((resolve) => {
      const createdInvoice = this._invoiceService.save(
        invoiceData.invoice,
        invoiceData.invoiceItems,
      );
      this._invoiceService.send(createdInvoice);
      resolve(HTTPResponse.success({ invoice: createdInvoice }));
    });
  }

  async saveAsDraft(invoiceData: InvoiceData): Promise<DefaultResponse<{ invoice: InvoiceType }>> {
    return new Promise((resolve) => {
      const createdInvoice = this._invoiceService.save(
        invoiceData.invoice,
        invoiceData.invoiceItems,
      );
      resolve(HTTPResponse.success({ invoice: createdInvoice }));
    });
  }

  async update(
    invoiceData: InvoiceData,
  ): Promise<
    DefaultResponse<{ updatedInvoice: InvoiceType; updatedInvoiceItems: InvoiceItemType[] }>
  > {
    return new Promise((resolve) => {
      const { updatedInvoice, updatedInvoiceItems } = this._invoiceService.update(
        invoiceData.invoice,
        invoiceData.invoiceItems,
      );
      resolve(HTTPResponse.success({ updatedInvoice, updatedInvoiceItems }));
    });
  }

  async delete(invoice: InvoiceType): Promise<DefaultResponse<{ deletedInvoice: InvoiceType }>> {
    return new Promise((resolve) => {
      const deletedInvoice = this._invoiceService.delete(invoice);
      resolve(HTTPResponse.success({ deletedInvoice }));
    });
  }
}

export default InvoiceController;
