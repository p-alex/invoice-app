import InvoiceFilter from "./InvoiceFilter";
import Layout from "../components/Layout";
import { PlusIcon } from "../svgs";
import { PrimaryButton } from "../ui";
import InvoiceList from "./InvoiceList";
import useIsWindowSizeLowerThan from "../hooks/useIsWindowSizeLowerThan";
import { useState } from "react";
import CreateInvoiceSideModal from "../components/CreateInvoiceSideModal";
import VisibiltyToggleProvider from "../components/VisibilityToggleProvider";
import { useInvoiceEndpoint } from "../endpoints";
import { InvoiceType } from "../entities/Invoice";
import useLocalStorage from "../hooks/useLocalStorage";

export interface IInvoiceFilters {
  draft: boolean;
  pending: boolean;
  paid: boolean;
}

export type InvoiceFilterType = keyof IInvoiceFilters;

function InvoicesPage() {
  const localStorage = useLocalStorage();

  const { createInvoice } = useInvoiceEndpoint();

  const handleSaveDraft = (invoice: InvoiceType) => {
    localStorage.setItem("draft", invoice);
  };

  const handleRemoveDraft = (invoiceId: string) => {
    const currentDraft = localStorage.getItem<InvoiceType>("draft");

    if (!currentDraft) return;

    if (currentDraft.id === invoiceId) localStorage.removeItem("draft");
  };

  const invoices = [] as unknown[];

  const [invoiceFilters, setInvoiceFilters] = useState<IInvoiceFilters>({
    draft: false,
    pending: false,
    paid: false,
  });

  const handleSetInvoiceFilter = (filter: InvoiceFilterType, isChecked: boolean) => {
    setInvoiceFilters((prevState) => ({ ...prevState, [filter]: isChecked }));
  };

  const isMobileSize = useIsWindowSizeLowerThan(640);

  return (
    <Layout>
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
                handleCreateInvoice={createInvoice}
                handleSaveDraft={handleSaveDraft}
                handleRemoveDraft={handleRemoveDraft}
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
    </Layout>
  );
}

export default InvoicesPage;
