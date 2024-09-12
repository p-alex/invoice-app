import { ButtonHTMLAttributes, forwardRef, LegacyRef } from "react";
import { twMerge } from "tailwind-merge";

interface Props extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: string;
}

const DangerButton = forwardRef(
  ({ children, ...btnProps }: Props, ref: LegacyRef<HTMLButtonElement>) => {
    return (
      <button
        type="button"
        {...btnProps}
        className={twMerge(
          [
            "dark:text-buttonTextDarkTheme flex h-12 w-max items-center rounded-buttonBorderRadius bg-danger px-6 py-[18px] font-bold text-white transition-colors hover:bg-dangerLight",
          ],
          btnProps.className,
        )}
        ref={ref}
      >
        {children}
      </button>
    );
  },
);

export default DangerButton;
