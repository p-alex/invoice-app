import InvoiceFilter from "./InvoiceFilter";
import Layout from "../components/Layout";
import { PlusIcon } from "../svgs";
import { PrimaryButton } from "../ui";
import InvoiceList from "./InvoiceList";
import useIsWindowSizeLowerThan from "../hooks/useIsWindowSizeLowerThan";
import { useState } from "react";

export interface IInvoiceFilters {
  draft: boolean;
  pending: boolean;
  paid: boolean;
}

export type InvoiceFilterType = keyof IInvoiceFilters;

function InvoicesPage() {
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
      <section>
        <header className="mb-14 flex flex-col items-center justify-between gap-7 text-center sm:flex-row sm:text-start">
          <div className="flex flex-col gap-2">
            <h1 className="text-4xl font-bold text-textLT dark:text-textDT">Invoices</h1>
            <p className="font-medium text-muted ">No invoices</p>
          </div>
          <div className="flex items-center gap-5 sm:gap-10">
            <InvoiceFilter
              invoiceFilters={invoiceFilters}
              handleSetInvoiceFilter={handleSetInvoiceFilter}
            >
              {isMobileSize ? "Filter" : "Filter by status"}
            </InvoiceFilter>
            <PrimaryButton icon={<PlusIcon />}>
              {isMobileSize ? "New" : "New Invoice"}
            </PrimaryButton>
          </div>
        </header>

        <InvoiceList invoices={invoices} />
      </section>
    </Layout>
  );
}

export default InvoicesPage;
