import { useEffect, useState } from "react";
import { SelectGroupProps } from "./SelectGroup";
import createRandomId from "../../utils/createRandomId";
import useHideWhenClickOutside from "../../hooks/useHideWhenClickOutside";

function useSelectGroup({ id, options, onChange, value }: SelectGroupProps) {
  const selectGroupId = createRandomId();

  const [isActive, setIsActive] = useState(false);

  const [selectedOption, setSelectedOption] = useState(value ? value : options[0]);

  const handleToggle = () => setIsActive((prev) => !prev);

  const handleDeactivate = () => setIsActive(false);

  useHideWhenClickOutside({ containerId: selectGroupId, hideFunc: handleDeactivate });

  const handleChange = (option: string) => {
    onChange(option);

    setSelectedOption(option);

    handleDeactivate();
  };

  const handleDeactivateOnEscPress = (event: KeyboardEvent) => {
    if (event.key === "Escape") {
      handleDeactivate();
      document.getElementById(id)?.focus();
    }
  };

  useEffect(() => {
    document.addEventListener("keydown", handleDeactivateOnEscPress);

    return () => {
      document.removeEventListener("keydown", handleDeactivateOnEscPress);
    };
  }, []);

  return { isActive, selectedOption, handleToggle, handleChange, selectGroupId };
}

export default useSelectGroup;
