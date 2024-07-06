import React, { HtmlHTMLAttributes } from "react";
import { twMerge } from "tailwind-merge";
import "./FormThreeColGrid.css";

interface Props extends HtmlHTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
  className: string;
}

function FormThreeColGrid({ children, className, ...divProps }: Props) {
  return (
    <div className={twMerge(["formThreeColGrid w-full"], className)} {...divProps}>
      {children}
    </div>
  );
}

export default FormThreeColGrid;
