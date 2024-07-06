import { useEffect, useState } from "react";
import { IInvoiceItem } from "../../../entities/InvoiceItem";
import { IInvoiceItemListProps } from "./InvoiceItemList";

export type InvoiceItemFieldNames = keyof {
  readonly [Key in keyof Omit<IInvoiceItem, "id" | "invoiceId">]: IInvoiceItem[Key];
};

export type HandleChangeInvoiceItem = <T>(
  value: T,
  invoiceItemId: string,
  fieldName: InvoiceItemFieldNames,
) => void;

function useInvoiceItemList({ invoices, onChange }: IInvoiceItemListProps) {
  const [currentInvoiceItems, setCurrentInvoiceItems] = useState<IInvoiceItem[]>(invoices);

  useEffect(() => {
    if (currentInvoiceItems.length === 0) return;
    onChange(currentInvoiceItems);
  }, [currentInvoiceItems, onChange]);

  const handleAddInvoiceItem = (id: string, invoiceId: string) => {
    const newInvoiceItem = { id, invoiceId, name: "", quantity: 1, price: 0 };
    const updatedInvoiceItems = [...currentInvoiceItems, newInvoiceItem];
    setCurrentInvoiceItems(updatedInvoiceItems);
  };

  const handleChangeInvoiceItem = <TValue>(
    value: TValue,
    invoiceItemId: string,
    fieldName: InvoiceItemFieldNames,
  ) => {
    const updatedInvoiceItems = currentInvoiceItems.map((invoiceItem) => {
      if (invoiceItem.id === invoiceItemId) return { ...invoiceItem, [fieldName]: value };
      return invoiceItem;
    });
    setCurrentInvoiceItems(updatedInvoiceItems);
  };

  const handleDeleteInvoiceItem = (id: string) => {
    setCurrentInvoiceItems((prevState) => prevState.filter((invoiceItem) => invoiceItem.id !== id));
  };

  return {
    currentInvoiceItems,
    handleAddInvoiceItem,
    handleChangeInvoiceItem,
    handleDeleteInvoiceItem,
  };
}

export default useInvoiceItemList;
