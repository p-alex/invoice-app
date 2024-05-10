import { ButtonHTMLAttributes } from "react";

interface Props extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
}

function NavbarButton({ children, ...btnProps }: Props) {
  return (
    <button
      className="flex h-8 w-8 items-center justify-center rounded-full text-muted md:h-10 md:w-10"
      {...btnProps}
    >
      {children}
    </button>
  );
}

export default NavbarButton;
