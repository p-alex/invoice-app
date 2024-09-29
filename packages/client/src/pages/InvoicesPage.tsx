import { useEffect, useState } from "react";
import Layout from "../components/Layout";
import { InvoiceType } from "../entities/Invoice";
import { invoiceController } from "../api";
import feebackPopupManager from "../utils/FeedbackPopupManager";
import useIsWindowSizeLowerThan from "../hooks/useIsWindowSizeLowerThan";
import CreateInvoiceSideModal from "../components/CreateInvoiceSideModal";
import { PlusIcon } from "../svgs";
import { PrimaryButton } from "../ui";
import VisibiltyToggleProvider from "../components/VisibilityToggleProvider";
import InvoiceFilter from "../components/InvoiceDisplay/InvoiceFilter";
import InvoiceList from "../components/InvoiceDisplay/InvoiceList";

export interface IInvoiceFilters {
  draft: boolean;
  pending: boolean;
  paid: boolean;
}

export type InvoiceFilterType = keyof IInvoiceFilters;

function InvoicesPage() {
  const [invoices, setInvoices] = useState<InvoiceType[]>([]);

  const handleLoadInvoices = async () => {
    try {
      const response = await invoiceController.getAll();
      if (response.success) {
        setInvoices(response.result.invoices);
      }
    } catch (error: any) {
      feebackPopupManager.displayPopup(error.message);
    }
  };

  useEffect(() => {
    handleLoadInvoices();
  }, []);

  const [invoiceFilters, setInvoiceFilters] = useState<IInvoiceFilters>({
    draft: false,
    pending: false,
    paid: false,
  });

  const handleSetInvoiceFilter = (filter: InvoiceFilterType, isChecked: boolean) =>
    setInvoiceFilters((prevState) => ({ ...prevState, [filter]: isChecked }));

  const isMobileSize = useIsWindowSizeLowerThan(640);

  const handleAddInvoiceToState = (invoice: InvoiceType) =>
    setInvoices((prevState) => [...prevState, invoice]);

  const handleDisplayPopup = (message: string) => {
    feebackPopupManager.displayPopup(message);
  };

  const checkIfAllFiltersAreDisabled = () => {
    return !invoiceFilters.draft && !invoiceFilters.paid && !invoiceFilters.pending;
  };

  const filteredInvoices = invoices.filter((invoice) => {
    const areAllFiltersDisabled = checkIfAllFiltersAreDisabled();
    if (areAllFiltersDisabled) return true;
    if (invoiceFilters[invoice.status] !== true) return false;
    return true;
  });

  return (
    <Layout>
      <div className="mb-8">
        <header className="mb-14 flex flex-col items-center justify-between gap-7 sm:flex-row">
          <div className="flex flex-col gap-2 text-center sm:text-left">
            <h1 className="text-4xl font-bold text-textLT dark:text-textDT">Invoices</h1>
            <p className="font-medium text-muted">
              {invoices.length === 0
                ? "No Invoices"
                : `There are ${filteredInvoices.length} ${invoices.length !== filteredInvoices.length ? "" : "total"} invoices`}
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
                  handleDisplayPopup={handleDisplayPopup}
                  handleAddInvoiceToState={handleAddInvoiceToState}
                  saveAndSendRequest={invoiceController.saveAndSend}
                  saveRequest={invoiceController.save}
                  firstFocusableButtonRef={props.firstFocusableButtonRef}
                  lastFocusableButtonRef={props.lastFocusableButtonRef}
                />
              )}
              trapFocus
              disableScroll
            />
          </div>
        </header>
        <InvoiceList invoices={filteredInvoices} />
      </div>
    </Layout>
  );
}

export default InvoicesPage;
