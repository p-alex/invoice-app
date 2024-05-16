import { useEffect, useRef, useState } from "react";
import { SelectGroupProps } from "./SelectGroup";
import useHideWhenClickOutside from "../../hooks/useHideWhenClickOutside";

function useSelectGroup({ id, options, onChange, value }: SelectGroupProps) {
  const selectGroupContainerRef = useRef<HTMLDivElement>(null);

  const selectGroupToggleRef = useRef<HTMLButtonElement>(null);

  const [isActive, setIsActive] = useState(false);

  const [selectedOption, setSelectedOption] = useState(value ? value : options[0]);

  const handleToggle = () => setIsActive((prev) => !prev);

  const handleDeactivate = () => setIsActive(false);

  useHideWhenClickOutside({ containerRef: selectGroupContainerRef, hideFunc: handleDeactivate });

  const handleChange = (option: string) => {
    onChange(option);

    setSelectedOption(option);

    handleDeactivate();
  };

  const handleDeactivateOnEscPress = (event: KeyboardEvent) => {
    if (
      event.key === "Escape" &&
      selectGroupContainerRef.current!.contains(document.activeElement)
    ) {
      handleDeactivate();
      console.log("here");
      document.getElementById(id)?.focus();
    }
  };

  useEffect(() => {
    document.addEventListener("keydown", handleDeactivateOnEscPress);

    return () => {
      document.removeEventListener("keydown", handleDeactivateOnEscPress);
    };
  }, []);

  return {
    isActive,
    selectedOption,
    handleToggle,
    handleChange,
    selectGroupContainerRef,
    selectGroupToggleRef,
  };
}

export default useSelectGroup;
