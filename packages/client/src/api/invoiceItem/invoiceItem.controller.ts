import { DefaultResponse } from "../../entities/DefaultResponse";
import { InvoiceItemType } from "../../entities/InvoiceItem";
import HTTPResponse from "../HTTPResponse";
import InvoiceItemService from "./invoiceItem.service";

class InvoiceItemController {
  constructor(private readonly _invoiceItemService: InvoiceItemService) {
    this.getAllByInvoiceId = this.getAllByInvoiceId.bind(this);
  }

  async getAllByInvoiceId(
    invoiceId: string,
  ): Promise<DefaultResponse<{ invoiceItems: InvoiceItemType[] }>> {
    return new Promise((resolve) => {
      const invoiceItems = this._invoiceItemService.getAllByInvoiceId(invoiceId);
      resolve(HTTPResponse.success({ invoiceItems }));
    });
  }
}

export default InvoiceItemController;
