import { TrashIcon } from "../../../svgs";
import { InputGroup } from "../../../ui";
import { HandleChangeInvoiceItem } from "./useInvoiceItemList";
import "./InvoiceItem.css";
import { InvoiceItemType } from "../../../entities/InvoiceItem";

interface Props {
  invoiceItemIndex: number;
  invoiceItem: InvoiceItemType;
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
          text={invoiceItem.name}
          handleChange={(event) =>
            handleChangeInvoiceItem(event.target.value, invoiceItem.id, "name")
          }
        />
      </div>
      <div style={{ gridArea: "quantity" }}>
        <InputGroup
          id={`itemQuantity${invoiceItemIndex}`}
          label="Qty"
          type="number"
          text={invoiceItem.quantity.toString()}
          handleChange={(event) =>
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
          text={invoiceItem.price.toString()}
          handleChange={(event) =>
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
