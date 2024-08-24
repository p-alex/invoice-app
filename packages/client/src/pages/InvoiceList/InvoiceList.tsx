import Invoice from "../../components/Invoice";
import { InvoiceType } from "../../entities/Invoice";

interface Props {
  invoices: InvoiceType[];
  isLoading?: boolean;
}

function InvoiceList({ invoices }: Props) {
  const sortInvoicesByCreatedAtDesc = (invoices: InvoiceType[]) =>
    invoices.sort((a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime());

  const sortedInvoices = invoices.length > 0 ? sortInvoicesByCreatedAtDesc(invoices) : invoices;

  return (
    <div className="mb-10">
      {invoices.length > 0 && (
        <ul className="flex flex-col gap-4">
          {sortedInvoices.map((invoice, index) => (
            <li key={"invoice-" + index} className={"text-textLT dark:text-textDT"}>
              <Invoice invoice={invoice} />
            </li>
          ))}
        </ul>
      )}

      {invoices.length === 0 && (
        <div className="flex w-full  items-center justify-center  text-center text-textLT sm:h-[70vh] dark:text-textDT">
          <div className="flex w-[242px] flex-col gap-16">
            <img src={"./images/illustration-empty.svg"} width={242} height={200} alt="" />
            <div className="flex flex-col gap-6">
              <h2 className="text-2xl font-bold">There is nothing here</h2>
              <p className="text-sm">
                Create a new invoice by clicking the New Invoice button and get started
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default InvoiceList;
