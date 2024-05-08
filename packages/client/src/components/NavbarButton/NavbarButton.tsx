import { ButtonHTMLAttributes } from "react";

interface Props extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
}

function NavbarButton({ children, ...btnProps }: Props) {
  return (
    <button
      className="w-8 h-8 md:w-10 md:h-10 rounded-full flex items-center justify-center text-muted"
      {...btnProps}
    >
      {children}
    </button>
  );
}

export default NavbarButton;
