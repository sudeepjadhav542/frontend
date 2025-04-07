// @ts-nocheck
import React, { useState, useEffect, useCallback, useContext } from "react";
// import Select from "react-dropdown-select";
import Select, { SingleValue } from "react-select";
import { FixedSizeList as List } from "react-window";
import { JobIndex } from "../../context/job_list_context";

interface Option {
  label: string;
  value: string;
}

const VirtualizedMenuList = (props) => {
  const { options, children, maxHeight, getValue } = props;
  const height = Math.min(maxHeight, options.length * 35);
  const [value] = getValue();

  const initialOffset =
    options.findIndex((option) => option.value === value?.value) * 35;

  return (
    <List
      height={height}
      itemCount={children.length}
      itemSize={35}
      initialScrollOffset={initialOffset}
      width="100%"
      className="z-10"
    >
      {({ index, style }) => <div style={style}>{children[index]}</div>}
    </List>
  );
};

// Custom filter function with debouncing
const debounce = (func, delay) => {
  let timer;
  return (...args) => {
    clearTimeout(timer);
    timer = setTimeout(() => func(...args), delay);
  };
};

const ReactSelectWithOptimization = ({ options, name, selectedOption, setSelected, onchange, id }) => {
  const [filteredOptions, setFilteredOptions] = useState(options);
  const [searchTerm, setSearchTerm] = useState("");

  const handleSearch = useCallback(
    debounce((inputValue) => {
      const lowercasedInput = inputValue.toLowerCase();
      setFilteredOptions(
        options.filter((option) =>
          option.label.toLowerCase().includes(lowercasedInput)
        )
      );
    }, 300),
    [options]
  );

  const handleChange = (selectedOption: SingleValue<Option>) => {
    // console.log("Selected:", selectedOption);
    setSelected(selectedOption);
    onchange(id,selectedOption?.label);
  };

  const handleInputChange = (inputValue: string) => {
    setSearchTerm(inputValue);
    // Optionally filter options here
  };

  const customStyles = {
    control: (provided: any, state: any) => ({
      ...provided,
      borderRadius: "10px",
      borderColor: state.isFocused ? "#6b7280" : "#9ca3af",
      boxShadow: state.isFocused ? "#000000" : "#000000",
      "&:hover": {
        borderColor: "#90267A",
      },
    }),
    placeholder: (provided: any) => ({
      ...provided,
      color: "#6b7280",
      "&:hover": {
        color: "#90267A",
      },
    }),
    option: (provided: any, state: any) => ({
      ...provided,
      backgroundColor: state.isSelected ? "#90267A" : "#ffffff",
      "&:hover": {
        backgroundColor: "#d99ecd"
      }
    }),
    singleValue: (provided: any) => ({
      ...provided,
      color: "#4b5563",
    }),
  };

  useEffect(() => {
    handleSearch(searchTerm);
  }, [searchTerm, handleSearch]);
  return (
    <Select<Option>
      options={filteredOptions}
      onInputChange={handleInputChange}
      onChange={handleChange}
      components={{ MenuList: VirtualizedMenuList }}
      isSearchable
      placeholder={name}
      styles={customStyles}
      value={selectedOption}
      name={name}
    />
  );
};

export default ReactSelectWithOptimization;
