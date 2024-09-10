import { InvoiceItemType } from "../entities/InvoiceItem";

function calculateInvoiceTotalPrice(invoiceItems: InvoiceItemType[]) {
  let totalPrice = 0;
  for (let i = 0; i < invoiceItems.length; i++) {
    const price = invoiceItems[i].price;
    const quantity = invoiceItems[i].quantity;
    totalPrice = totalPrice + price * quantity;
  }
  return totalPrice;
}

export default calculateInvoiceTotalPrice;
