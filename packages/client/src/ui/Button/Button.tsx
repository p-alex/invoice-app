import { ButtonHTMLAttributes } from "react";
import { twMerge } from "tailwind-merge";

interface Props extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: string;
}

function Button({ children, ...btnProps }: Props) {
  return (
    <button
      type="button"
      {...btnProps}
      className={twMerge(
        [
          `flex h-12 items-center  justify-center rounded-[500px] bg-[#F9FAFE] px-6 py-[18px] font-bold text-[#7E88C3] transition-colors hover:bg-[#DFE3FA] hover:text-[#7E88C3] dark:bg-[#252945] dark:text-[#DFE3FA] dark:hover:bg-[#FFFFFF] dark:hover:text-[#252945]`,
        ],
        btnProps.className,
      )}
    >
      {children}
    </button>
  );
}

export default Button;
