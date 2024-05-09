import { ButtonHTMLAttributes } from "react";

interface Props extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: string;
}

function Button({ children, ...btnProps }: Props) {
  return (
    <button
      type="button"
      {...btnProps}
      className="transition-colors flex items-center font-bold h-12 px-6 py-[18px] hover:bg-btnBgHoverLT dark:hover:bg-btnBgHoverDT hover:text-btnTextHoverLT dark:hover:text-btnTextDT bg-btnBgLT dark:bg-btnBgDT text-btnTextLT dark:text-buttonTextDarkTheme rounded-[500px]"
    >
      {children}
    </button>
  );
}

export default Button;
