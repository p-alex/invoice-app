import { TrashIcon } from "../../../svgs";
import "./InvoiceItem.css";

interface Props {
  invoiceItemIndex: number;
  handleRemoveInvoiceItem: (index: number) => void;
  nameField: React.ReactNode;
  quantityField: React.ReactNode;
  priceField: React.ReactNode;
  totalPrice: string;
}

function InvoiceItem(props: Props) {
  return (
    <li className="invoiceItemGrid align-top">
      <div style={{ gridArea: "itemName" }} className="min-w-[214px]">
        {props.nameField}
      </div>
      <div style={{ gridArea: "quantity" }}>{props.quantityField}</div>
      <div style={{ gridArea: "price" }}>{props.priceField}</div>
      <div style={{ gridArea: "total" }} className="flex w-full flex-col gap-2">
        {<p className="text-sm font-medium text-muted">Total</p>}
        <div className="flex h-fieldHeight items-center font-bold">
          <p className="text-muted">{props.totalPrice}</p>
        </div>
      </div>
      <div
        style={{ gridArea: "delete" }}
        className="mt-7 flex h-fieldHeight items-center justify-center"
      >
        <button
          type="button"
          className="flex w-full items-center justify-center text-muted transition-colors hover:text-danger"
          onClick={() => props.handleRemoveInvoiceItem(props.invoiceItemIndex)}
          aria-label="delete invoice item"
        >
          <TrashIcon />
        </button>
      </div>
    </li>
  );
}

export default InvoiceItem;
