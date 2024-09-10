import { useEffect, useState } from "react";
import { InvoiceType } from "../../entities/Invoice";
import { IInvoiceFilters, InvoiceFilterType } from "../../pages/InvoicesPage";
import useIsWindowSizeLowerThan from "../../hooks/useIsWindowSizeLowerThan";
import { invoiceController } from "../../api";
import feebackPopupManager from "../../utils/FeedbackPopupManager";

function useInvoiceManager() {
  const [invoices, setInvoices] = useState<InvoiceType[]>([]);

  const [invoiceFilters, setInvoiceFilters] = useState<IInvoiceFilters>({
    draft: false,
    pending: false,
    paid: false,
  });

  const handleSetInvoiceFilter = (filter: InvoiceFilterType, isChecked: boolean) =>
    setInvoiceFilters((prevState) => ({ ...prevState, [filter]: isChecked }));

  const isMobileSize = useIsWindowSizeLowerThan(640);

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

  const handleAddInvoiceToState = (invoice: InvoiceType) =>
    setInvoices((prevState) => [...prevState, invoice]);

  useEffect(() => {
    handleLoadInvoices();
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
