import { invoiceController } from "../../api";
import { Button, DangerButton, PrimaryButton } from "../../ui";
import feebackPopupManager from "../../utils/FeedbackPopupManager";
import Dialog from "../Dialog";
import { EditInvoiceSideModal } from "../EditInvoiceSideModal";
import InvoiceStatus from "../Invoice/InvoiceStatus";
import InvoiceDetails from "../InvoiceDetails/InvoiceDetails";
import VisibiltyToggleProvider from "../VisibilityToggleProvider";
import useInvoiceManager from "./useInvoiceManager";

export interface InvoiceMangerProps {
  invoiceId: string;
}

function InvoiceManager(props: InvoiceMangerProps) {
  const { invoice, invoiceItems, handleUpdateInvoiceStateData, handleDeleteInvoice } =
    useInvoiceManager(props);

  return (
    <>
      {invoice ? (
        <>
          <div className="mb-6 flex items-center justify-between rounded-uiBorderRadius bg-uiBgLT px-8 py-6 dark:bg-uiBgDT">
            <div className="flex w-full items-center justify-between gap-5 font-medium text-muted sm:w-auto">
              Status <InvoiceStatus status={invoice.status} />
            </div>
            <div className="fixed bottom-0 left-0 flex w-full items-center justify-center gap-2 border-t-uiBgLTDarker bg-uiBgLT p-5 sm:relative sm:w-auto sm:px-0 sm:py-0 dark:border-t-uiBgDTLighter dark:bg-uiBgDT">
              <VisibiltyToggleProvider
                toggle={({ handleToggleVisibilty, toggleRef }) => (
                  <Button ref={toggleRef} onClick={handleToggleVisibilty}>
                    Edit
                  </Button>
                )}
                content={({
                  handleToggleOffVisibilty,
                  firstFocusableButtonRef,
                  lastFocusableButtonRef,
                }) => (
                  <EditInvoiceSideModal
                    defaultValues={{ invoice, invoiceItems }}
                    handleCloseModal={handleToggleOffVisibilty}
                    handleDisplayPopup={feebackPopupManager.displayPopup}
                    updateInvoiceRequest={invoiceController.update}
                    handleUpdateInvoiceStateData={handleUpdateInvoiceStateData}
                    firstFocusableButtonRef={firstFocusableButtonRef}
                    lastFocusableButtonRef={lastFocusableButtonRef}
                  />
                )}
                trapFocus
                disableScroll
              />
              <VisibiltyToggleProvider
                toggle={({ toggleRef, handleToggleVisibilty }) => (
                  <DangerButton onClick={handleToggleVisibilty} ref={toggleRef}>
                    Delete
                  </DangerButton>
                )}
                content={({
                  handleToggleOffVisibilty,
                  firstFocusableButtonRef,
                  lastFocusableButtonRef,
                }) => (
                  <Dialog
                    title="Confirm Deletion"
                    description={`Are you sure you want to delete invoice #${invoice.id}? This action cannot be undone.`}
                    closeFunc={handleToggleOffVisibilty}
                    cancelBtnRef={firstFocusableButtonRef}
                    actionBtn={
                      <DangerButton ref={lastFocusableButtonRef} onClick={handleDeleteInvoice}>
                        Delete
                      </DangerButton>
                    }
                  />
                )}
                trapFocus
                disableScroll
              />

              <PrimaryButton>Mark as Paid</PrimaryButton>
            </div>
          </div>
          <InvoiceDetails invoice={invoice} invoiceItems={invoiceItems} />
        </>
      ) : (
        <p className="text-textLT dark:text-textDT">Invoice does not exist.</p>
      )}
    </>
  );
}

export default InvoiceManager;
