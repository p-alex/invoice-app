import { useState } from "react";
import { CheckIcon } from "../../svgs";

interface Props {
  id?: string;
  name?: string;
  label: string;
  checked: boolean;
  onChange: (isChecked: boolean) => void;
}

function Checkbox({ id, name, label, checked, onChange }: Props) {
  const [isChecked, setIsChecked] = useState<boolean>(checked);

  const handleToggleCheck = () => {
    setIsChecked((prevState) => !prevState);
    onChange(!isChecked);
  };

  return (
    <div className="flex items-center gap-4 font-bold text-textLT hover:cursor-pointer dark:text-textDT">
      <button
        id={id}
        name={name}
        className={`flex h-4 w-4 items-center justify-center rounded-[2px] border border-transparent hover:border-primary  ${isChecked ? "bg-primary dark:bg-primary" : "bg-[#DFE3FA] dark:bg-[#121422]"}`}
        onClick={handleToggleCheck}
        role="checkbox"
        aria-checked={isChecked}
        aria-label={isChecked ? `Uncheck ${label}` : `Check ${label}`}
      >
        {isChecked && <CheckIcon />}
      </button>
      <label className="cursor-pointer capitalize" htmlFor={id}>
        {label}
      </label>
    </div>
  );
}

export default Checkbox;
