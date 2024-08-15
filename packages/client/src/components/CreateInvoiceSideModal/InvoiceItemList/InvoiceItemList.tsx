export interface Props {
  children: React.ReactNode;
  error?: string;
}

function InvoiceItemList(props: Props) {
  return (
    <div className="flex flex-col gap-6">
      <ul className="flex w-full flex-col gap-8 text-black sm:gap-6 dark:text-white">
        {props.children}
      </ul>
      {props.error && <p className="text-danger">{props.error}</p>}
    </div>
  );
}

export default InvoiceItemList;
