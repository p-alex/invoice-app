import { Link, useParams } from "react-router-dom";
import Layout from "../components/Layout";
import { ChevronLeft } from "../svgs";
import InvoiceManager from "../components/InvoiceManager/InvoiceManager";

function InvoicePage() {
  const params = useParams();

  const invoiceId = params.invoiceId as string;

  return (
    <Layout>
      <Link to="/invoices" className="mb-8 flex items-center gap-6">
        <ChevronLeft /> <span className="font-bold text-textLT dark:text-textDT">Go Back</span>
      </Link>
      <InvoiceManager invoiceId={invoiceId} />
    </Layout>
  );
}

export default InvoicePage;
