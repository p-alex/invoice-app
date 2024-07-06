import { FormHTMLAttributes } from "react";

interface Props extends FormHTMLAttributes<HTMLFormElement> {
  children: React.ReactNode;
}

function Form({ children, ...formProps }: Props) {
  return (
    <form {...formProps} className="relative flex flex-col gap-12">
      {children}
    </form>
  );
}

export default Form;
