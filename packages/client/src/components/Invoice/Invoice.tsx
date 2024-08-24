import { InvoiceType } from "../../entities/Invoice";
import { ArrowRightIcon } from "../../svgs";
import getPrettyDate from "../../utils/getPrettyDate";
import "./Invoice.css";
import InvoiceStatus from "./InvoiceStatus";

interface Props {
  invoice: InvoiceType;
}

function Invoice({ invoice }: Props) {
  const dueAt = new Date(invoice.due_at);

  return (
    <a
      href="#"
      className="block w-full rounded-lg border border-transparent bg-uiBgLT hover:border-primary dark:bg-uiBgDT"
      aria-label={`view invoice with id ${invoice.id}`}
    >
      <div className="invoiceGrid px-6 py-6 shadow-md sm:py-4">
        <p className="invoiceGrid__id font-bold">#{invoice.id}</p>
        <p className="invoiceGrid__date text-sm font-medium text-muted">
          Due {getPrettyDate(dueAt.getFullYear(), dueAt.getMonth(), dueAt.getDate())}
        </p>
        <p className="invoiceGrid__clientName text-sm font-medium">{invoice.client_name}</p>
        <p className="invoiceGrid__price font-bold">${invoice.total_price}</p>
        <div className="invoiceGrid__status">
          <InvoiceStatus status={invoice.status} />
        </div>
        <div className="invoiceGrid__arrow">
          <ArrowRightIcon />
        </div>
      </div>
    </a>
  );
}

export default Invoice;
