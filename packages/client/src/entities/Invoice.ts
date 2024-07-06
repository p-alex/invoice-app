export interface IInvoice {
  id: string;
  from_streetAddress: string;
  from_city: string;
  from_postCode: string;
  to_clientName: string;
  to_clientEmail: string;
  to_streetAddress: string;
  to_city: string;
  to_postCode: string;
  to_country: string;
  invoiceDate: Date;
  paymentTerms: PaymentTerms;
}

type PaymentTerms = "Net 1 Day" | "Net 7 Days" | "Net 14 Days" | "Net 30 Days";
