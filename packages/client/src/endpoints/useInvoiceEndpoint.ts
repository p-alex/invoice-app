/* eslint-disable @typescript-eslint/no-unused-vars */
import useLocalStorage from "../hooks/useLocalStorage";
import { CreateInvoiceType, InvoiceType } from "../entities/Invoice";
import { DefaultResponse } from "../entities/DefaultResponse";

export type CreateInvoiceRequestType = (
  invoiceDate: CreateInvoiceType,
) => Promise<DefaultResponse<InvoiceType>>;

function useInvoiceEndpoint() {
  const localStorage = useLocalStorage();

  const createInvoice: CreateInvoiceRequestType = async (invoiceData) =>
    new Promise((resolve, _) => {
      let currentInvoices = localStorage.getItem<InvoiceType[]>("invoices");

      if (currentInvoices === null) currentInvoices = [];

      const newInvoices = [...currentInvoices, invoiceData.invoice];

      localStorage.setItem("invoices", newInvoices);

      resolve({ success: true, result: invoiceData.invoice, error: "" });
    });

  return { createInvoice };
}

export default useInvoiceEndpoint;
