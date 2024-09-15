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

  const handleUpdateInvoice = async (invoice: InvoiceType, invoiceItems: InvoiceItemType[]) => {
    if (!invoice) return { success: false };
    try {
      const response = await invoiceController.update(invoice, invoiceItems);
      if (!response.success) {
        feebackPopupManager.displayPopup(response.error);
        return { success: false };
      }
      feebackPopupManager.displayPopup("Invoice updated successfully!");
      handleUpdateInvoiceStateData(
        response.result.updatedInvoice,
        response.result.updatedInvoiceItems,
      );
      return { success: true };
    } catch (error: any) {
      feebackPopupManager.displayPopup(error.message);
      return { success: false };
    }
  };

  const handleSendInvoice = async () => {
    if (!invoice) return;
    try {
      const response = await invoiceController.send(invoice);
      if (!response.success) return feebackPopupManager.displayPopup(response.error);
      feebackPopupManager.displayPopup("Invoice sent successfully!");
      handleUpdateInvoiceStateData({ ...invoice, status: "pending" }, invoiceItems);
    } catch (error: any) {
      feebackPopupManager.displayPopup(error.message);
    }
  };

  const handleMarkInvoiceAsPaid = async () => {
    if (!invoice) return;
    try {
      const response = await invoiceController.update({ ...invoice, status: "paid" }, invoiceItems);
      if (!response.success) return feebackPopupManager.displayPopup(response.error);
      feebackPopupManager.displayPopup("Invoice marked as paid successfully!");
      handleUpdateInvoiceStateData({ ...invoice, status: "paid" }, invoiceItems);
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
    handleDeleteInvoice,
    handleUpdateInvoice,
    handleSendInvoice,
    handleMarkInvoiceAsPaid,
  };
}

export default useInvoiceManager;
