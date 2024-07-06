import { IInvoiceItem } from "../../../entities/InvoiceItem";
import { TrashIcon } from "../../../svgs";
import { InputGroup } from "../../../ui";
import { HandleChangeInvoiceItem } from "./useInvoiceItemList";
import "./InvoiceItem.css";

interface Props {
  invoiceItemIndex: number;
  invoiceItem: IInvoiceItem;
  handleDeleteInvoiceItem: (id: string) => void;
  handleChangeInvoiceItem: HandleChangeInvoiceItem;
}

function InvoiceItem({
  invoiceItemIndex,
  invoiceItem,
  handleDeleteInvoiceItem,
  handleChangeInvoiceItem,
}: Props) {
  return (
    <li className="invoiceItemGrid">
      <div style={{ gridArea: "itemName" }} className="min-w-[214px]">
        <InputGroup
          id={`itemName${invoiceItemIndex}`}
          label="Item name"
          onChange={(event) => handleChangeInvoiceItem(event.target.value, invoiceItem.id, "name")}
        />
      </div>
      <div style={{ gridArea: "quantity" }}>
        <InputGroup
          id={`itemQuantity${invoiceItemIndex}`}
          label="Qty"
          type="number"
          value={invoiceItem.quantity}
          onChange={(event) =>
            handleChangeInvoiceItem(Number(event.target.value), invoiceItem.id, "quantity")
          }
          onFocus={(event) => event.target.select()}
        />
      </div>
      <div style={{ gridArea: "price" }}>
        <InputGroup
          id={`itemPrice${invoiceItemIndex}`}
          label="Price"
          type="number"
          value={invoiceItem.price}
          onChange={(event) =>
            handleChangeInvoiceItem(Number(event.target.value), invoiceItem.id, "price")
          }
          onFocus={(event) => event.target.select()}
        />
      </div>
      <div style={{ gridArea: "total" }} className="flex w-full flex-col gap-2">
        {<p className="text-sm font-medium text-muted">Total</p>}
        <div className="flex h-fieldHeight items-center font-bold">
          <p className="text-muted">{(invoiceItem.price * invoiceItem.quantity).toFixed(2)}</p>
        </div>
      </div>
      <div
        style={{ gridArea: "delete" }}
        className="items-ceneter flex h-fieldHeight justify-center"
      >
        <button
          type="button"
          className="flex w-full items-center justify-center text-muted transition-colors hover:text-danger"
          onClick={() => handleDeleteInvoiceItem(invoiceItem.id)}
          aria-label="delete invoice item"
        >
          <TrashIcon />
        </button>
      </div>
    </li>
  );
}

export default InvoiceItem;
