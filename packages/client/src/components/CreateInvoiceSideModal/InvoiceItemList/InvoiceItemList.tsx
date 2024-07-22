import InvoiceItem from "./InvoiceItem";
import { Button } from "../../../ui";
import useInvoiceItemList from "./useInvoiceItemList";
import createRandomId from "../../../utils/createRandomId";
import { InvoiceItemType } from "../../../entities/InvoiceItem";

export interface InvoiceItemListProps extends ArrayOfObjectFormProps {
  currentInvoiceId: string;
}

export interface ArrayOfObjectFormProps {
  list: InvoiceItemType[];
  error?: string;
  handleChange: (invoiceItemList: InvoiceItemType[]) => void;
}

function InvoiceItemList(props: InvoiceItemListProps) {
  const {
    currentInvoiceItems,
    handleAddInvoiceItem,
    handleChangeInvoiceItem,
    handleDeleteInvoiceItem,
  } = useInvoiceItemList(props);

  return (
    <div className="flex flex-col gap-6">
      {currentInvoiceItems.length !== 0 && (
        <ul className="flex w-full flex-col gap-8 text-black sm:gap-6 dark:text-white">
          {currentInvoiceItems.map((invoiceItem, index) => (
            <InvoiceItem
              key={invoiceItem.id}
              invoiceItemIndex={index}
              invoiceItem={invoiceItem}
              handleChangeInvoiceItem={handleChangeInvoiceItem}
              handleDeleteInvoiceItem={handleDeleteInvoiceItem}
            />
          ))}
        </ul>
      )}
      <Button
        type="button"
        onClick={() => handleAddInvoiceItem(createRandomId(), props.currentInvoiceId)}
      >
        + Add New Item
      </Button>

      {props.error && <p className="text-danger">{props.error}</p>}
    </div>
  );
}

export default InvoiceItemList;
