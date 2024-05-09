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
      className={`flex items-center gap-4 transition-colors font-bold h-12 ${paddingX} py-[18px] hover:bg-primaryLight dark:hover:text-btnTextDT bg-primary text-white dark:text-buttonTextDarkTheme rounded-[500px]`}
    >
      {icon && (
        <div className="w-8 h-8 rounded-full bg-white flex items-center justify-center">{icon}</div>
      )}
      {children}
    </button>
  );
}

export default PrimaryButton;
