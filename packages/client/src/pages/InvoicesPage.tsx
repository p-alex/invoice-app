import InvoiceDisplay from "../components/InvoiceDisplay";
import Layout from "../components/Layout";

export interface IInvoiceFilters {
  draft: boolean;
  pending: boolean;
  paid: boolean;
}

export type InvoiceFilterType = keyof IInvoiceFilters;

function InvoicesPage() {
  return (
    <Layout>
      <InvoiceDisplay />
    </Layout>
  );
}

export default InvoicesPage;
