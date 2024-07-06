import InvoiceItem from "./InvoiceItem";
import { Button } from "../../../ui";
import useInvoiceItemList from "./useInvoiceItemList";
import { IInvoiceItem } from "../../../entities/InvoiceItem";
import createRandomId from "../../../utils/createRandomId";

export interface IInvoiceItemListProps {
  currentInvoiceId: string;
  invoices: IInvoiceItem[];
  onChange: (invoiceItemList: IInvoiceItem[]) => void;
}

function InvoiceItemList(props: IInvoiceItemListProps) {
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
    </div>
  );
}

export default InvoiceItemList;
