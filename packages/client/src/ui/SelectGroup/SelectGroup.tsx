import { useRef } from "react";
import useSelectGroup from "./useSelectGroup";
import FocusTrap from "../../components/FocusTrap";

export interface SelectGroupProps {
  id: string;
  label: string;
  value?: string;
  options: string[];
  error?: string;
  onChange: (option: string) => void;
}

function SelectGroup(props: SelectGroupProps) {
  const { isActive, selectedOption, handleToggle, handleChange, selectGroupId } =
    useSelectGroup(props);

  const firstFocusableElement = useRef<HTMLButtonElement>(null);

  const lastFocusableElement = useRef<HTMLButtonElement>(null);

  const isError = typeof props.error === "string";

  const borderColor = isError ? "border-danger" : "border-borderLT dark:border-borderDT";

  return (
    <div className="relative flex flex-col gap-6 rounded-[4px]" id={selectGroupId}>
      <div className="flex flex-col gap-2">
        {props.label && (
          <label htmlFor={props.id} className="text-sm font-medium text-muted">
            {props.label}
          </label>
        )}
        <button
          className={`field ${borderColor} flex items-center justify-between`}
          id={props.id}
          onClick={handleToggle}
        >
          {selectedOption} <img src="./images/icon-arrow-down.svg" width={11} height={7} alt="" />
        </button>
        {props.error && <p className="text-medium text-sm text-danger">{props.error}</p>}
      </div>

      {isActive && props.options.length > 0 && (
        <ul className="absolute top-28 flex w-full flex-col rounded-[inherit] bg-uiBgLT dark:bg-uiBgDT">
          <FocusTrap element={lastFocusableElement} />
          {props.options.map((option, index) => {
            return (
              <button
                className="last-of-type:border-b-none border-b border-b-borderLT px-6 py-3 text-left font-bold text-textLT dark:border-b-borderDT dark:text-textDT"
                key={"select-group-option-" + option + index}
                onClick={() => handleChange(option)}
                autoFocus={index === 0}
                ref={
                  index === 0
                    ? firstFocusableElement
                    : index === props.options.length - 1
                      ? lastFocusableElement
                      : undefined
                }
              >
                {option}
              </button>
            );
          })}
          <FocusTrap element={firstFocusableElement} />
        </ul>
      )}
    </div>
  );
}

export default SelectGroup;
