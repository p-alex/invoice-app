import { ButtonHTMLAttributes } from "react";

interface Props extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: string;
}

function DangerButton({ children, ...btnProps }: Props) {
  return (
    <button
      type="button"
      {...btnProps}
      className="dark:text-buttonTextDarkTheme flex h-12 w-max items-center rounded-[500px] bg-danger px-6 py-[18px] font-bold text-white transition-colors hover:bg-dangerLight"
    >
      {children}
    </button>
  );
}

export default DangerButton;
