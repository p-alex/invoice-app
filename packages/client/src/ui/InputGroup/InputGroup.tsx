import { InputHTMLAttributes } from "react";
import { twMerge } from "tailwind-merge";

interface Props extends InputHTMLAttributes<HTMLInputElement> {
  label: string;
  containerClassName?: string;
  error?: string;
}

function InputGroup({ label, error, containerClassName, ...inputProps }: Props) {
  const isError = typeof error === "string";

  const borderColor = isError ? "border-danger" : "border-borderLT dark:border-borderDT";

  return (
    <div className={twMerge(["flex w-full flex-col gap-2"], containerClassName)}>
      <label className={`text-sm font-medium text-muted`} htmlFor={inputProps.id}>
        {label}
      </label>
      <input type="text" {...inputProps} className={`field ${borderColor}`} />
      {error && <p className="text-sm text-danger">{error}</p>}
    </div>
  );
}

export default InputGroup;
