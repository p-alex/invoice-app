import { ArrowDownIcon } from "../../../svgs";
import { IInvoiceFilters, InvoiceFilterType } from "../../../pages/InvoicesPage";
import VisibiltyToggleProvider from "../../VisibilityToggleProvider";
import Checkbox from "../../../ui/Checkbox";

interface Props {
  invoiceFilters: IInvoiceFilters;
  handleSetInvoiceFilter: (filter: InvoiceFilterType, isChecked: boolean) => void;
  children: string;
}

function InvoiceFilter({ invoiceFilters, handleSetInvoiceFilter, children }: Props) {
  const handleSetFilter = (filter: InvoiceFilterType, isChecked: boolean) =>
    handleSetInvoiceFilter(filter, isChecked);

  return (
    <div className="relative flex flex-col items-center">
      <VisibiltyToggleProvider
        toggle={({ isVisible, handleToggleVisibilty, toggleRef }) => (
          <button
            className="flex h-full items-center gap-3 font-bold text-textLT dark:text-textDT"
            onClick={handleToggleVisibilty}
            ref={toggleRef}
          >
            <span>{children}</span>
            <span className={isVisible ? "rotate-180" : "rotate-0"}>
              <ArrowDownIcon />
            </span>
          </button>
        )}
        content={() => (
          <ul className="absolute top-12 z-10 flex w-[192px] flex-col gap-4 rounded-uiBorderRadius bg-uiBgLT p-6 shadow-lg dark:bg-uiBgDT">
            {Object.keys(invoiceFilters).map((filter) => {
              return (
                <li key={filter + "-filter"}>
                  <Checkbox
                    id={filter + "-filter"}
                    label={filter}
                    checked={invoiceFilters[filter as InvoiceFilterType]}
                    onChange={(isChecked) =>
                      handleSetFilter(filter as InvoiceFilterType, isChecked)
                    }
                  />
                </li>
              );
            })}
          </ul>
        )}
        hideWithEsc
        hideWhenClickOutside
      ></VisibiltyToggleProvider>
    </div>
  );
}

export default InvoiceFilter;
