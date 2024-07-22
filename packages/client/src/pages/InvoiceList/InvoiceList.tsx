interface Props {
  invoices: unknown[];
  isLoading?: boolean;
}

function InvoiceList({ invoices }: Props) {
  return (
    <div className="mb-10">
      {invoices.length > 0 && (
        <ul>
          {invoices.map((index) => (
            <li key={"invoice-" + index}>invoice</li>
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
