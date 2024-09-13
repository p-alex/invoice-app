import { useCallback, useEffect, useState } from "react";
import { InvoiceType } from "../../entities/Invoice";
import { InvoiceItemType } from "../../entities/InvoiceItem";
import { invoiceController, invoiceItemController } from "../../api";
import feebackPopupManager from "../../utils/FeedbackPopupManager";
import { InvoiceMangerProps } from "./InvoiceManager";
import { useNavigate } from "react-router-dom";

function useInvoiceManager({ invoiceId }: InvoiceMangerProps) {
  const navigate = useNavigate();

  const [invoice, setInvoice] = useState<InvoiceType | null>(null);

  const [invoiceItems, setInvoiceItems] = useState<InvoiceItemType[]>([]);

  const handleGetInvoice = useCallback(async () => {
    try {
      const response = await invoiceController.getById(invoiceId);
      if (response.success) {
        setInvoice(response.result.invoice);
        return;
      }
      feebackPopupManager.displayPopup(response.error);
    } catch (error: any) {
      feebackPopupManager.displayPopup(error.error);
    }
  }, [invoiceId]);

  const handleDeleteInvoice = async () => {
    try {
      const response = await invoiceController.delete(invoice!);
      if (!response.success) return feebackPopupManager.displayPopup(response.error);
      feebackPopupManager.displayPopup("Invoice deleted successfully!");
      navigate("/invoices");
    } catch (error: any) {
      feebackPopupManager.displayPopup(error.message);
    }
  };

  const handleUpdateInvoiceStateData = (invoice: InvoiceType, invoiceItems: InvoiceItemType[]) => {
    setInvoice(invoice);
    setInvoiceItems(invoiceItems);
  };

  const handleGetInvoiceItems = useCallback(async () => {
    try {
      const response = await invoiceItemController.getAllByInvoiceId(invoiceId);
      if (response.success) {
        setInvoiceItems(response.result.invoiceItems);
        return;
      }
      feebackPopupManager.displayPopup(response.error);
    } catch (error: any) {
      feebackPopupManager.displayPopup(error.error);
    }
  }, [invoiceId]);

  const handleLoadInvoiceData = useCallback(async () => {
    await handleGetInvoice();
    await handleGetInvoiceItems();
  }, [handleGetInvoice, handleGetInvoiceItems]);

  useEffect(() => {
    handleLoadInvoiceData();
  }, [handleLoadInvoiceData]);

  return {
    invoice,
    invoiceItems,
    handleUpdateInvoiceStateData,
    handleDeleteInvoice,
  };
}

export default useInvoiceManager;
