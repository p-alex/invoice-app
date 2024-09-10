import { DefaultResponse } from "../../entities/DefaultResponse";
import { InvoiceItemType } from "../../entities/InvoiceItem";
import HTTPResponse from "../HTTPResponse";
import InvoiceItemService from "./invoiceItem.service";

class InvoiceItemController {
  constructor(private readonly _invoiceItemService: InvoiceItemService) {
    this.getAllByInvoiceId = this.getAllByInvoiceId.bind(this);
    this.updateInvoiceItems = this.updateInvoiceItems.bind(this);
  }

  async getAllByInvoiceId(
    invoiceId: string,
  ): Promise<DefaultResponse<{ invoiceItems: InvoiceItemType[] }>> {
    return new Promise((resolve) => {
      const invoiceItems = this._invoiceItemService.getAllByInvoiceId(invoiceId);
      resolve(HTTPResponse.success({ invoiceItems }));
    });
  }

  async updateInvoiceItems(
    invoiceItems: InvoiceItemType[],
  ): Promise<DefaultResponse<{ invoiceItems: InvoiceItemType[] }>> {
    return new Promise((resolve) => {
      const updatedInvoiceItems = this._invoiceItemService.updateMany(invoiceItems);
      resolve(HTTPResponse.success({ invoiceItems: updatedInvoiceItems }));
    });
  }
}

export default InvoiceItemController;
