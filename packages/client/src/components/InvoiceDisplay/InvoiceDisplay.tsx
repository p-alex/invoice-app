import InvoiceFilter from "./InvoiceFilter";
import VisibiltyToggleProvider from "../VisibilityToggleProvider";
import { PrimaryButton } from "../../ui";
import { PlusIcon } from "../../svgs";
import CreateInvoiceSideModal from "../CreateInvoiceSideModal";
import InvoiceList from "./InvoiceList";
import { invoiceController } from "../../api";
import feebackPopupManager from "../../utils/FeedbackPopupManager";
import useInvoiceDisplay from "./useInvoiceDisplay";

function InvoiceDisplay() {
  const {
    invoices,
    invoiceFilters,
    isMobileSize,
    handleAddInvoiceToState,
    handleSetInvoiceFilter,
  } = useInvoiceDisplay();

  return (
    <div className="mb-8">
      <header className="mb-14 flex flex-col items-center justify-between gap-7 sm:flex-row">
        <div className="flex flex-col gap-2 text-center sm:text-left">
          <h1 className="text-4xl font-bold text-textLT dark:text-textDT">Invoices</h1>
          <p className="font-medium text-muted">
            {invoices.length === 0 ? "No Invoices" : `There are ${invoices.length} total invoices`}
          </p>
        </div>
        <div className="flex items-center gap-5 sm:gap-10">
          <InvoiceFilter
            invoiceFilters={invoiceFilters}
            handleSetInvoiceFilter={handleSetInvoiceFilter}
          >
            {isMobileSize ? "Filter" : "Filter by status"}
          </InvoiceFilter>
          <VisibiltyToggleProvider
            toggle={(props) => (
              <PrimaryButton
                icon={<PlusIcon />}
                onClick={props.handleToggleVisibilty}
                ref={props.toggleRef}
              >
                {isMobileSize ? "New" : "New Invoice"}
              </PrimaryButton>
            )}
            content={(props) => (
              <CreateInvoiceSideModal
                handleCloseModal={props.handleToggleOffVisibilty}
                displayPopup={feebackPopupManager.displayPopup}
                handleAddInvoiceToState={handleAddInvoiceToState}
                handleSaveAndSend={invoiceController.saveAndSend}
                handleSaveAsDraft={invoiceController.saveAsDraft}
                firstFocusableButtonRef={props.firstFocusableButtonRef}
                lastFocusableButtonRef={props.lastFocusableButtonRef}
              />
            )}
            trapFocus
            disableScroll
          />
        </div>
      </header>
      <InvoiceList invoices={invoices} />
    </div>
  );
}

export default InvoiceDisplay;
