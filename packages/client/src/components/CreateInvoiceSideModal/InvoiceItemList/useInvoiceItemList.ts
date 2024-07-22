import { useEffect, useState } from "react";
import { InvoiceItemListProps } from "./InvoiceItemList";
import { InvoiceItemType } from "../../../entities/InvoiceItem";

export type InvoiceItemFieldNames = keyof {
  readonly [Key in keyof Omit<InvoiceItemType, "id" | "invoiceId">]: InvoiceItemType[Key];
};

export type HandleChangeInvoiceItem = <T>(
  value: T,
  invoiceItemId: string,
  fieldName: InvoiceItemFieldNames,
) => void;

function useInvoiceItemList({ list, handleChange }: InvoiceItemListProps) {
  const [currentInvoiceItems, setCurrentInvoiceItems] = useState<InvoiceItemType[]>(list);

  const handleAddInvoiceItem = (id: string, invoiceId: string) => {
    const newInvoiceItem = { id, invoiceId, name: "", quantity: 1, price: 0 };
    const updatedInvoiceItems = [...currentInvoiceItems, newInvoiceItem];
    setCurrentInvoiceItems(updatedInvoiceItems);
    handleChange(updatedInvoiceItems);
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
    handleChange(updatedInvoiceItems);
  };

  const handleDeleteInvoiceItem = (id: string) => {
    setCurrentInvoiceItems((prevState) => {
      const updatedInvoiceItems = prevState.filter((invoiceItem) => invoiceItem.id !== id);
      handleChange(updatedInvoiceItems);
      return updatedInvoiceItems;
    });
  };

  useEffect(() => {
    if (list.length === 0) setCurrentInvoiceItems(list);
  }, [list]);

  return {
    currentInvoiceItems,
    handleAddInvoiceItem,
    handleChangeInvoiceItem,
    handleDeleteInvoiceItem,
  };
}

export default useInvoiceItemList;
