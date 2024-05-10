import Layout from "../components/Layout";
import { PlusIcon } from "../svgs";
import { Button, DangerButton, InputGroup, PrimaryButton, SelectGroup } from "../ui";

function InvoicesPage() {
  return (
    <Layout>
      <div className="grid grid-cols-2 gap-4">
        <Button>Save as draft</Button>
        <PrimaryButton>Mark as Paid</PrimaryButton>
        <PrimaryButton icon={<PlusIcon className="text-primary" />}>New Invoice</PrimaryButton>
        <DangerButton>Delete</DangerButton>
        <InputGroup error="error" label="Street Address" id="street" />
        <SelectGroup
          id="test"
          label="Select Group"
          error="hello"
          options={["test", "hello", "world"]}
          onChange={(option) => option}
        />
      </div>
    </Layout>
  );
}

export default InvoicesPage;
