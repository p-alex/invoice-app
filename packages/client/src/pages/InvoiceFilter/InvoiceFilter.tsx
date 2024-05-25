import { useState } from "react";
import { ArrowDownIcon } from "../../svgs";
import InvoiceFilterDropdown from "./InvoiceFilterDropdown";
import { IInvoiceFilters, InvoiceFilterType } from "../InvoicesPage";

interface Props {
  invoiceFilters: IInvoiceFilters;
  handleSetInvoiceFilter: (filter: InvoiceFilterType, isChecked: boolean) => void;
  children: string;
}

function InvoiceFilter({ invoiceFilters, handleSetInvoiceFilter, children }: Props) {
  const [isActive, setIsActive] = useState(false);

  const handleToggleMenu = () => setIsActive((prevState) => !prevState);

  const handleSetFilter = (filter: InvoiceFilterType, isChecked: boolean) =>
    handleSetInvoiceFilter(filter, isChecked);

  return (
    <div className="relative flex flex-col items-center">
      <button
        className="flex h-full items-center gap-3 font-bold text-textLT dark:text-textDT"
        onClick={handleToggleMenu}
      >
        <span>{children}</span>
        <span className={isActive ? "rotate-180" : "rotate-0"}>
          <ArrowDownIcon />
        </span>
      </button>

      {isActive && (
        <InvoiceFilterDropdown invoiceFilters={invoiceFilters} handleSetFilter={handleSetFilter} />
      )}
    </div>
  );
}

export default InvoiceFilter;
