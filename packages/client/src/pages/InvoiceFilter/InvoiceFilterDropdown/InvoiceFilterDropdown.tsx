import { useRef } from "react";
import Checkbox from "../../../ui/Checkbox";
import { IInvoiceFilters, InvoiceFilterType } from "../../InvoicesPage";

interface Props {
  invoiceFilters: IInvoiceFilters;
  handleSetFilter: (filter: InvoiceFilterType, isChecked: boolean) => void;
}

function InvoiceFilterDropdown({ invoiceFilters, handleSetFilter }: Props) {
  const containerRef = useRef<HTMLUListElement>(null);

  return (
    <ul
      className="absolute top-12 z-10 flex w-[192px] flex-col gap-4 rounded-lg bg-uiBgLT p-6 shadow-lg dark:bg-uiBgDT"
      ref={containerRef}
    >
      {Object.keys(invoiceFilters).map((filter) => {
        return (
          <li key={filter + "-filter"}>
            <Checkbox
              id={filter + "-filter"}
              label={filter}
              checked={invoiceFilters[filter as InvoiceFilterType]}
              onChange={(isChecked) => handleSetFilter(filter as InvoiceFilterType, isChecked)}
            />
          </li>
        );
      })}
    </ul>
  );
}

export default InvoiceFilterDropdown;
