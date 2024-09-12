import getPrettyDate from "../../utils/getPrettyDate";
import { InvoiceType } from "../../entities/Invoice";
import { InvoiceItemType } from "../../entities/InvoiceItem";
import InvoiceItemsSummary from "./InvoiceItemsSummary/InvoiceItemsSummary";

interface Props {
  invoice: InvoiceType;
  invoiceItems: InvoiceItemType[];
}

function InvoiceDetails({ invoice, invoiceItems }: Props) {
  let invoiceCreatedDate: Date = new Date();

  let invoiceDueDate = new Date();

  if (invoice) {
    invoiceCreatedDate = new Date(invoice.created_at);
    invoiceDueDate = new Date(invoice.due_at);
  }

  return (
    <>
      {invoice && (
        <div className="mb-8">
          <div className="mb-[110px] rounded-uiBorderRadius bg-uiBgLT p-8 text-textLT sm:mb-0 dark:bg-uiBgDT dark:text-textDT">
            <div className="mb-6 flex justify-between">
              <div className="flex flex-col gap-2">
                <p className="font-bold">
                  <span className="text-muted">#</span>
                  {invoice.id}
                </p>
                <p>{invoice.project_description}</p>
              </div>
              <div className="text-right text-sm">
                <p>{invoice.sender_address.street}</p>
                <p>{invoice.sender_address.city}</p>
                <p>{invoice.sender_address.post_code}</p>
                <p>{invoice.sender_address.country}</p>
              </div>
            </div>

            <div className="gapY-8 mb-10 flex flex-wrap gap-x-16 gap-y-8 sm:gap-x-[118px]">
              <div className="flex flex-col gap-8">
                <div className="flex flex-col gap-3">
                  <p className="text-sm font-medium text-muted">Invoice Date</p>
                  <p className="font-bold">
                    {getPrettyDate(
                      invoiceCreatedDate.getFullYear(),
                      invoiceCreatedDate.getMonth(),
                      invoiceCreatedDate.getDate(),
                    )}
                  </p>
                </div>
                <div className="flex flex-col gap-3">
                  <p className="text-sm font-medium text-muted">Invoice Due</p>
                  <p className="font-bold">
                    {getPrettyDate(
                      invoiceDueDate.getFullYear(),
                      invoiceDueDate.getMonth(),
                      invoiceDueDate.getDate(),
                    )}
                  </p>
                </div>
              </div>
              <div className="flex flex-col gap-3">
                <p className="text-sm font-medium text-muted">Bill To</p>
                <div className="flex flex-col gap-2">
                  <p className="font-bold">{invoice.client_name}</p>
                  <div className="text-sm">
                    <p>{invoice.receiver_address.street}</p>
                    <p>{invoice.receiver_address.post_code}</p>
                    <p>{invoice.receiver_address.city}</p>
                    <p>{invoice.receiver_address.country}</p>
                  </div>
                </div>
              </div>
              <div className="flex flex-col gap-3">
                <p className="text-sm font-medium text-muted">Sent To</p>
                <p className="font-bold">{invoice.client_email}</p>
              </div>
            </div>

            <InvoiceItemsSummary invoiceItems={invoiceItems} />
          </div>
        </div>
      )}
    </>
  );
}

export default InvoiceDetails;
