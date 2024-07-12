import useSelectGroup from "./useSelectGroup";
import VisibiltyToggleProvider from "../../components/VisibilityToggleProvider";

export interface SelectGroupProps {
  id: string;
  label: string;
  value?: string;
  options: string[];
  error?: string;
  onChange: (option: string) => void;
}

function SelectGroup(props: SelectGroupProps) {
  const { selectedOption, handleChange } = useSelectGroup(props);

  const isError = typeof props.error === "string";

  const borderColor = isError ? "border-danger" : "border-borderLT dark:border-borderDT";

  return (
    <div className="relative flex w-full flex-col gap-6 rounded-[4px]">
      <VisibiltyToggleProvider
        toggle={({ handleToggleVisibilty, toggleRef }) => (
          <div className="flex flex-col gap-2">
            {props.label && (
              <label htmlFor={props.id} className="text-sm font-medium text-muted">
                {props.label}
              </label>
            )}
            <button
              type="button"
              className={`field ${borderColor} flex items-center justify-between`}
              id={props.id}
              onClick={handleToggleVisibilty}
              ref={toggleRef}
            >
              {selectedOption}{" "}
              <img src="./images/icon-arrow-down.svg" width={11} height={7} alt="" />
            </button>
            {props.error && <p className="text-medium text-sm text-danger">{props.error}</p>}
          </div>
        )}
        content={({
          handleToggleOffVisibilty,
          firstFocusableButtonRef,
          lastFocusableButtonRef,
        }) => (
          <ul className="absolute top-24 flex w-full flex-col rounded-lg bg-uiBgLT shadow-lg dark:bg-uiBgDT">
            {props.options.map((option, index) => {
              return (
                <button
                  type="button"
                  className="last-of-type:border-b-none border-b border-b-borderLT px-6 py-3 text-left font-bold text-textLT dark:border-b-borderDT dark:text-textDT"
                  key={"select-group-option-" + option + index}
                  onClick={() => {
                    handleChange(option);
                    handleToggleOffVisibilty();
                  }}
                  autoFocus={index === 0}
                  ref={
                    index === 0
                      ? firstFocusableButtonRef
                      : index === props.options.length - 1
                        ? lastFocusableButtonRef
                        : undefined
                  }
                >
                  {option}
                </button>
              );
            })}
          </ul>
        )}
        trapFocus
        hideWithEsc
        hideWhenClickOutside
      ></VisibiltyToggleProvider>
    </div>
  );
}

export default SelectGroup;
