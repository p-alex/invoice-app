import Layout from "../components/Layout";
import { Button } from "../ui";

function InvoicesPage() {
  return (
    <Layout>
      <div className="flex gap-4">
        <Button>Save as draft</Button>
      </div>
    </Layout>
  );
}

export default InvoicesPage;
