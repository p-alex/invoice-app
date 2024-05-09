import { ButtonHTMLAttributes } from "react";

interface Props extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: string;
}

function Button({ children, ...btnProps }: Props) {
  return (
    <button
      type="button"
      {...btnProps}
      className="transition-colors flex items-center font-bold h-12 px-6 py-[18px] hover:bg-buttonBgHoverLightTheme dark:hover:bg-buttonBgHoverDarkTheme hover:text-buttonTextHoverLightTheme dark:hover:text-buttonTextHoverDarkTheme bg-buttonBgLightTheme dark:bg-buttonBgDarkTheme text-buttonTextLightTheme dark:text-buttonTextDarkTheme rounded-[500px]"
    >
      {children}
    </button>
  );
}

export default Button;
