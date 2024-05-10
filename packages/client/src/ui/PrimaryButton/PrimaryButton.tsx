import { ButtonHTMLAttributes } from "react";

interface Props extends ButtonHTMLAttributes<HTMLButtonElement> {
  icon?: React.ReactNode;
  children: string;
}

function PrimaryButton({ children, icon, ...btnProps }: Props) {
  const paddingX = icon ? "pl-2 pr-6" : "px-6";

  return (
    <button
      type="button"
      {...btnProps}
      className={`flex h-12 items-center gap-4 font-bold transition-colors ${paddingX} dark:text-buttonTextDarkTheme rounded-[500px] bg-primary py-[18px] text-white hover:bg-primaryLight dark:hover:text-btnTextDT`}
    >
      {icon && (
        <div className="flex h-8 w-8 items-center justify-center rounded-full bg-white">{icon}</div>
      )}
      {children}
    </button>
  );
}

export default PrimaryButton;
