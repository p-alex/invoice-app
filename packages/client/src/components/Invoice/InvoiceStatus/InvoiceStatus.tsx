import { InvoiceType } from "../../../entities/Invoice";

interface Props {
  status: InvoiceType["status"];
}

function InvoiceStatus({ status }: Props) {
  const colors: { [Property in Props["status"]]: { bg: string; text: string; dot: string } } = {
    pending: {
      bg: "bg-[#FF8F0016]",
      text: "text-[#FF8F00]",
      dot: "bg-[#FF8F00]",
    },
    draft: {
      bg: "bg-[#DFE3FA60] dark:bg-[#DFE3FA16]",
      text: "text-[#333] dark:text-[#DFE3FA]",
      dot: "bg-[#333] dark:bg-[#DFE3FA]",
    },
    paid: {
      bg: "bg-[#33d6a016]",
      text: "text-[#33D69F]",
      dot: "bg-[#33D69F]",
    },
  };

  const bgColor = colors[status].bg;
  const textColor = colors[status].text;
  const dotColor = colors[status].dot;

  return (
    <div className={`${bgColor} flex h-10 w-[104px] items-center justify-center gap-2 rounded-lg`}>
      <div className={`${dotColor} h-2 w-2 rounded-full`}></div>
      <p className={`${textColor} font-bold capitalize`}>{status}</p>
    </div>
  );
}

export default InvoiceStatus;
