import { InputHTMLAttributes } from "react";

interface Props extends InputHTMLAttributes<HTMLInputElement> {
  label: string;
  error?: string;
}

function InputGroup({ label, error, ...inputProps }: Props) {
  const isError = typeof error === "string";

  const borderColor = isError ? "border-danger" : "border-borderLT dark:border-borderDT";

  return (
    <div className={`flex flex-col gap-2 ${inputProps.disabled ? "opacity-75" : ""}`}>
      <label className="text-sm font-medium text-muted" htmlFor={inputProps.id}>
        {label}
      </label>
      <input type="text" {...inputProps} className={`field ${borderColor}`} />
      {error && <p className="text-sm text-danger">{error}</p>}
    </div>
  );
}

export default InputGroup;
