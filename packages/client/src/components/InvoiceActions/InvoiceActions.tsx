import { useEffect, useState } from "react";
import { InvoiceType, validateInvoice } from "../../entities/Invoice";
import { InvoiceItemType, validateInvoiceItems } from "../../entities/InvoiceItem";
import { Button, DangerButton, PrimaryButton } from "../../ui";
import Dialog from "../Dialog";
import { EditInvoiceSideModal } from "../EditInvoiceSideModal";
import InvoiceStatus from "../Invoice/InvoiceStatus";
import VisibiltyToggleProvider from "../VisibilityToggleProvider";

interface Props {
  invoiceData: {
    invoice: InvoiceType;
    invoiceItems: InvoiceItemType[];
  };
  handleUpdateInvoice: (
    invoice: InvoiceType,
    invoiceItems: InvoiceItemType[],
  ) => Promise<{ success: boolean }>;
  handleDeleteInvoice: () => void;
  handleSendInvoice: () => void;
  handleMarkInvoiceAsPaid: () => void;
}

function InvoiceActions(props: Props) {
  const [isValidInvoice, setIsValidInvoice] = useState(false);

  useEffect(() => {
    const isValidInvoice = validateInvoice(props.invoiceData.invoice);
    const isValidInvoiceItems = validateInvoiceItems(props.invoiceData.invoiceItems);
    setIsValidInvoice(isValidInvoice && isValidInvoiceItems);
  }, [props.invoiceData]);

  return (
    <div className="mb-6 flex items-center justify-between rounded-uiBorderRadius bg-uiBgLT px-8 py-6 dark:bg-uiBgDT">
      <div className="flex w-full items-center justify-between gap-5 font-medium text-muted sm:w-auto">
        Status <InvoiceStatus status={props.invoiceData.invoice.status} />
      </div>
      <div className="fixed bottom-0 left-0 flex w-full items-center justify-center gap-2 border-t-uiBgLTDarker bg-uiBgLT p-5 sm:relative sm:w-auto sm:px-0 sm:py-0 dark:border-t-uiBgDTLighter dark:bg-uiBgDT">
        {props.invoiceData.invoice.status !== "paid" && (
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
                defaultValues={{
                  invoice: props.invoiceData.invoice,
                  invoiceItems: props.invoiceData.invoiceItems,
                }}
                handleCloseModal={handleToggleOffVisibilty}
                handleUpdateInvoice={props.handleUpdateInvoice}
                firstFocusableButtonRef={firstFocusableButtonRef}
                lastFocusableButtonRef={lastFocusableButtonRef}
              />
            )}
            trapFocus
            disableScroll
          />
        )}
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
              description={`Are you sure you want to delete invoice #${props.invoiceData.invoice.id}? This action cannot be undone.`}
              closeFunc={handleToggleOffVisibilty}
              cancelBtnRef={firstFocusableButtonRef}
              actionBtn={
                <DangerButton ref={lastFocusableButtonRef} onClick={props.handleDeleteInvoice}>
                  Delete
                </DangerButton>
              }
            />
          )}
          trapFocus
          disableScroll
        />
        {props.invoiceData.invoice.status === "draft" && !isValidInvoice && null}
        {props.invoiceData.invoice.status === "draft" && isValidInvoice && (
          <PrimaryButton onClick={props.handleSendInvoice}>Send</PrimaryButton>
        )}
        {props.invoiceData.invoice.status === "pending" && isValidInvoice && (
          <VisibiltyToggleProvider
            toggle={({ handleToggleVisibilty, toggleRef }) => (
              <PrimaryButton onClick={handleToggleVisibilty} ref={toggleRef}>
                Mark as Paid
              </PrimaryButton>
            )}
            content={({ handleToggleOffVisibilty, firstFocusableButtonRef }) => (
              <Dialog
                title={"Mark #" + props.invoiceData.invoice.id + " as paid"}
                description={`Are you sure you want to mark invoice #${props.invoiceData.invoice.id} as paid? This action cannot be undone.`}
                closeFunc={handleToggleOffVisibilty}
                cancelBtnRef={firstFocusableButtonRef}
                actionBtn={
                  <PrimaryButton onClick={props.handleMarkInvoiceAsPaid}>
                    Mark as Paid
                  </PrimaryButton>
                }
              />
            )}
            trapFocus
            disableScroll
          />
        )}
      </div>
    </div>
  );
}

export default InvoiceActions;
