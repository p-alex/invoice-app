/* eslint-disable @typescript-eslint/no-unused-vars */
import useLocalStorage from "../hooks/useLocalStorage";
import { InvoiceType } from "../entities/Invoice";
import { DefaultResponse } from "../entities/DefaultResponse";

export type CreateInvoiceRequestType = (
  invoice: InvoiceType,
) => Promise<DefaultResponse<InvoiceType>>;

function useInvoiceEndpoint() {
  const localStorage = useLocalStorage();

  const createInvoice: CreateInvoiceRequestType = async (invoice) =>
    new Promise((resolve, _) => {
      let currentInvoices = localStorage.getItem<InvoiceType[]>("invoices");

      if (currentInvoices === null) currentInvoices = [];

      const newInvoices = [...currentInvoices, invoice];

      localStorage.setItem("invoices", newInvoices);

      resolve({ success: true, result: invoice, error: "" });
    });

  return { createInvoice };
}

export default useInvoiceEndpoint;
