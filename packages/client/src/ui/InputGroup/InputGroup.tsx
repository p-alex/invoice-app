import { InputHTMLAttributes } from "react";

interface Props extends InputHTMLAttributes<HTMLInputElement> {
  label: string;
  error?: string;
}

function InputGroup({ label, error, ...inputProps }: Props) {
  const isError = typeof error === "string";

  const borderColor = isError ? "border-danger" : "border-[#DFE3FA]";

  return (
    <div className={`flex flex-col gap-2 ${inputProps.disabled ? "opacity-75" : ""}`}>
      <label className="text-sm font-medium text-muted" htmlFor={inputProps.id}>
        {label}
      </label>
      <input
        type="text"
        {...inputProps}
        className={`block h-12 w-full rounded-[4px] border ${borderColor} bg-white px-5 py-4 font-bold text-black outline-none focus:border-primary disabled:cursor-not-allowed dark:border-[#252945] dark:bg-[#1E2139] dark:text-white`}
      />
      {error && <p className="text-sm text-danger">{error}</p>}
    </div>
  );
}

export default InputGroup;
