import { useEffect, useState } from "react";
import { InvoiceType } from "../../entities/Invoice";
import { IInvoiceFilters, InvoiceFilterType } from "../../pages/InvoicesPage";
import useIsWindowSizeLowerThan from "../../hooks/useIsWindowSizeLowerThan";
import { invoiceController } from "../../api";

function useInvoiceManager() {
  const [invoices, setInvoices] = useState<InvoiceType[]>([]);

  const [invoiceFilters, setInvoiceFilters] = useState<IInvoiceFilters>({
    draft: false,
    pending: false,
    paid: false,
  });

  const handleSetInvoiceFilter = (filter: InvoiceFilterType, isChecked: boolean) => {
    setInvoiceFilters((prevState) => ({ ...prevState, [filter]: isChecked }));
  };

  const isMobileSize = useIsWindowSizeLowerThan(640);

  const handleGetInvoices = async () => {
    try {
      const response = await invoiceController.findAll();
      if (response.success) {
        setInvoices(response.result);
      }
    } catch (error) {
      console.error(error);
    }
  };

  const handleAddInvoiceToState = (invoice: InvoiceType) => {
    setInvoices((prevState) => [...prevState, invoice]);
  };

  useEffect(() => {
    handleGetInvoices();
  }, []);

  return {
    invoices,
    invoiceFilters,
    isMobileSize,
    handleSetInvoiceFilter,
    handleAddInvoiceToState,
  };
}

export default useInvoiceManager;
