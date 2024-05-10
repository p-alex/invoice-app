import Layout from "../components/Layout";
import { PlusIcon } from "../svgs";
import { Button, DangerButton, PrimaryButton } from "../ui";

function InvoicesPage() {
  return (
    <Layout>
      <div className="flex gap-4">
        <Button>Save as draft</Button>
        <PrimaryButton>Mark as Paid</PrimaryButton>
        <PrimaryButton icon={<PlusIcon className="text-primary" />}>New Invoice</PrimaryButton>
        <DangerButton>Delete</DangerButton>
      </div>
    </Layout>
  );
}

export default InvoicesPage;
