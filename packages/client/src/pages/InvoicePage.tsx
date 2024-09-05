import { Link, useParams } from "react-router-dom";
import Layout from "../components/Layout";
import { ChevronLeft } from "../svgs";
import InvoiceDetails from "../components/InvoiceDetails/InvoiceDetails";
import InvoiceStatus from "../components/Invoice/InvoiceStatus/InvoiceStatus";
import { Button, DangerButton, PrimaryButton } from "../ui";
import { useCallback, useEffect, useState } from "react";
import { InvoiceType } from "../entities/Invoice";
import { InvoiceItemType } from "../entities/InvoiceItem";
import { invoiceController, invoiceItemController } from "../api";
import feebackPopupManager from "../utils/FeedbackPopupManager";

function InvoicePage() {
  const params = useParams();

  const invoiceId = params.invoiceId as string;

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

  return (
    <Layout>
      <Link to="/invoices" className="mb-8 flex items-center gap-6">
        <ChevronLeft /> <span className="font-bold text-textLT dark:text-textDT">Go Back</span>
      </Link>
      {invoice && (
        <>
          <div className="mb-6 flex items-center justify-between rounded-lg bg-uiBgLT px-8 py-6 dark:bg-uiBgDT">
            <div className="flex w-full items-center justify-between gap-5 font-medium text-muted sm:w-auto">
              Status <InvoiceStatus status={invoice.status} />
            </div>
            <div className="fixed bottom-0 left-0 flex w-full items-center justify-center gap-2 border-t-uiBgLTDarker bg-uiBgLT p-5 sm:relative sm:w-auto sm:px-0 sm:py-0 dark:border-t-uiBgDTLighter dark:bg-uiBgDT">
              <Button>Edit</Button>
              <DangerButton>Delete</DangerButton>
              <PrimaryButton>Mark as Paid</PrimaryButton>
            </div>
          </div>
          <InvoiceDetails invoice={invoice} invoiceItems={invoiceItems} />
        </>
      )}
    </Layout>
  );
}

export default InvoicePage;
