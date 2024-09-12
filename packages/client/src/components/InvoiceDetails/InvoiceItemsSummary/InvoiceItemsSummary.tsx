import { InvoiceItemType } from "../../../entities/InvoiceItem";
import "./InvoiceItemsSummary.css";

interface Props {
  invoiceItems: InvoiceItemType[];
}

function InvoiceItemsSummary({ invoiceItems }: Props) {
  let totalPrice = 0;

  return (
    <>
      {invoiceItems.length === 0 ? (
        <p>No invoice items</p>
      ) : (
        <div className="rounded-uiBorderRadius">
          <table className="invoiceItemsSummary w-full rounded-tl-[inherit] rounded-tr-[inherit] bg-uiBgLTDarker dark:bg-uiBgDTLighter">
            <caption>Invoice items summary</caption>
            <thead>
              <tr className="text-muted">
                <th data-cell="name">Item Name</th>
                <th data-cell="quantity">QTY.</th>
                <th data-cell="price">Price</th>
                <th data-cell="total">Total</th>
              </tr>
            </thead>
            <tbody>
              {invoiceItems.length > 0 &&
                invoiceItems.map((item) => {
                  totalPrice = totalPrice + item.quantity * item.price;
                  return (
                    <tr key={item.id} className="text-textLT dark:text-textDT">
                      <td data-cell="name">{item.name}</td>
                      <td
                        data-cell="quantity"
                        className="text-textLTDarker dark:text-textDTLighter"
                      >
                        {item.quantity}
                      </td>
                      <td
                        data-cell="price"
                        data-quantity={item.quantity}
                        className="text-textLTDarker dark:text-textDTLighter"
                      >
                        ${item.price}
                      </td>
                      <td data-cell="total">${item.quantity * item.price}</td>
                    </tr>
                  );
                })}
            </tbody>
          </table>

          <div className="flex items-center justify-between rounded-bl-[inherit] rounded-br-[inherit] bg-[#373B53] px-6 py-8 text-white sm:px-8 dark:bg-[#0C0E16] dark:text-textDT">
            <p className="text-sm">Amount Due</p>
            <p className="text-2xl font-bold">${totalPrice}</p>
          </div>
        </div>
      )}
    </>
  );
}

export default InvoiceItemsSummary;
