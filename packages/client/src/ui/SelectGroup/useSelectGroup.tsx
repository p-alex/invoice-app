import { useEffect, useState } from "react";
import { SelectGroupProps } from "./SelectGroup";

function useSelectGroup({ id, options, onChange, value }: SelectGroupProps) {
  const [isActive, setIsActive] = useState(false);

  const [selectedOption, setSelectedOption] = useState(value ? value : options[0]);

  const handleToggle = () => setIsActive((prev) => !prev);

  const handleDeactivate = () => {
    setIsActive(false);

    document.getElementById(id)?.focus();
  };

  const handleChange = (option: string) => {
    onChange(option);

    setSelectedOption(option);

    handleDeactivate();
  };

  const handleDeactivateOnEscPress = (event: KeyboardEvent) => {
    if (event.key === "Escape") handleDeactivate();
  };

  useEffect(() => {
    document.addEventListener("keydown", handleDeactivateOnEscPress);

    return () => {
      document.removeEventListener("keydown", handleDeactivateOnEscPress);
    };
  }, []);

  return { isActive, selectedOption, handleToggle, handleChange };
}

export default useSelectGroup;
