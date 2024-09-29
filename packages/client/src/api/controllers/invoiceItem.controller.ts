import { DefaultResponse } from "../../entities/DefaultResponse";
import { InvoiceItemType } from "../../entities/InvoiceItem";
import HTTPResponse from "../HTTPResponse";
import InvoiceItemService from "../services/invoiceItem.service";

class InvoiceItemController {
  constructor(private readonly _invoiceItemService: InvoiceItemService) {
    this.getAllByInvoiceId = this.getAllByInvoiceId.bind(this);
    this.update = this.update.bind(this);
  }

  async getAllByInvoiceId(
    invoiceId: string,
  ): Promise<DefaultResponse<{ invoiceItems: InvoiceItemType[] }>> {
    return new Promise((resolve) => {
      const invoiceItems = this._invoiceItemService.getAllByInvoiceId(invoiceId);
      resolve(
        HTTPResponse.success("The invoice items of invoice #" + invoiceId + " have been found!", {
          invoiceItems,
        }),
      );
    });
  }

  async update(
    invoiceItems: InvoiceItemType[],
  ): Promise<DefaultResponse<{ updatedInvoiceItems: InvoiceItemType[] }>> {
    return new Promise((resolve) => {
      const updatedInvoiceItems = this._invoiceItemService.updateMany(invoiceItems);
      resolve(HTTPResponse.success("The invoice items saved", { updatedInvoiceItems }));
    });
  }
}

export default InvoiceItemController;
