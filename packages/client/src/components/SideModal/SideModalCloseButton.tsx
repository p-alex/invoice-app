import { ButtonHTMLAttributes, forwardRef } from "react";
import { ChevronLeft } from "../../svgs";

interface Props extends ButtonHTMLAttributes<HTMLButtonElement> {}

const SideModalCloseButton = forwardRef((props: Props, ref: React.LegacyRef<HTMLButtonElement>) => {
  return (
    <button
      {...props}
      className="flex items-center gap-6 py-1 font-bold text-textLT dark:text-textDT"
      ref={ref}
    >
      <ChevronLeft /> Go back
    </button>
  );
});

export default SideModalCloseButton;
