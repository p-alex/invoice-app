import { ButtonHTMLAttributes, LegacyRef, forwardRef } from "react";
import { twMerge } from "tailwind-merge";

interface Props extends ButtonHTMLAttributes<HTMLButtonElement> {
  icon?: React.ReactNode;
  children: string;
}

forwardRef;

const PrimaryButton = forwardRef(
  ({ children, icon, ...btnProps }: Props, ref: LegacyRef<HTMLButtonElement>) => {
    const paddingX = icon ? "pl-2 pr-6" : "px-6";

    return (
      <button
        type="button"
        {...btnProps}
        className={twMerge(
          [
            `flex h-12 w-max items-center justify-center gap-4 font-bold transition-colors ${paddingX} dark:text-buttonTextDarkTheme dark:hover:text-btnTextDT rounded-buttonBorderRadius bg-primary py-[18px] text-white hover:bg-primaryLight disabled:cursor-not-allowed disabled:opacity-75`,
          ],
          btnProps.className,
        )}
        ref={ref}
      >
        {icon && (
          <div className="flex h-8 w-8 items-center justify-center rounded-buttonBorderRadius bg-white text-primary">
            {icon}
          </div>
        )}
        {children}
      </button>
    );
  },
);

export default PrimaryButton;
