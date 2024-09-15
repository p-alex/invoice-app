import InvoiceActions from "../InvoiceActions";
import InvoiceDetails from "../InvoiceDetails";
import useInvoiceManager from "./useInvoiceManager";

export interface InvoiceMangerProps {
  invoiceId: string;
}

function InvoiceManager(props: InvoiceMangerProps) {
  const {
    invoice,
    invoiceItems,
    handleDeleteInvoice,
    handleUpdateInvoice,
    handleSendInvoice,
    handleMarkInvoiceAsPaid,
  } = useInvoiceManager(props);

  return (
    <>
      {invoice ? (
        <>
          <InvoiceActions
            invoiceData={{ invoice, invoiceItems }}
            handleUpdateInvoice={handleUpdateInvoice}
            handleDeleteInvoice={handleDeleteInvoice}
            handleMarkInvoiceAsPaid={handleMarkInvoiceAsPaid}
            handleSendInvoice={handleSendInvoice}
          />
          <InvoiceDetails invoice={invoice} invoiceItems={invoiceItems} />
        </>
      ) : (
        <p className="text-textLT dark:text-textDT">Invoice does not exist.</p>
      )}
    </>
  );
}

export default InvoiceManager;
