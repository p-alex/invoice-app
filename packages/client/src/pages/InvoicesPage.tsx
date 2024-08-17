import InvoiceManager from "../components/InvoiceManager";
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
      <InvoiceManager />
    </Layout>
  );
}

export default InvoicesPage;
