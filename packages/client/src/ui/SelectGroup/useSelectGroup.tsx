import { useState } from "react";
import { SelectGroupProps } from "./SelectGroup";

function useSelectGroup({ options, onChange, value }: SelectGroupProps) {
  const [selectedOption, setSelectedOption] = useState(value ? value : options[0]);

  const handleChange = (option: string) => {
    onChange(option);
    setSelectedOption(option);
  };

  return {
    selectedOption,
    handleChange,
  };
}

export default useSelectGroup;
