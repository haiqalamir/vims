import { useEffect, useRef, useState } from "react";

export default function SelectComponent({
  options = ["New York", "Los Vegas", "California"],
  value,      // Parent can pass a value (vehicle id, for example)
  onChange,   // Callback to pass the selected value to the parent
}) {
  // Initialize selectedOption:
  // - If the options are objects, find the one whose "value" matches the passed value.
  // - Otherwise, default to the first option.
  const [selectedOption, setSelectedOption] = useState(() => {
    if (value !== undefined && options.length > 0) {
      if (typeof options[0] === "object") {
        const found = options.find(opt => opt.value === value);
        return found || options[0];
      }
      return value;
    }
    return options[0];
  });

  const [isDromdownOpen, setIsDromdownOpen] = useState(false);
  const ref = useRef(null);

  const handleClickOutside = (event) => {
    if (ref.current && !ref.current.contains(event.target)) {
      setIsDromdownOpen(false);
    }
  };

  useEffect(() => {
    document.addEventListener("click", handleClickOutside);
    return () => document.removeEventListener("click", handleClickOutside);
  }, []);

  // When the parent's value changes, update our local state.
  useEffect(() => {
    if (value !== undefined) {
      if (typeof options[0] === "object") {
        const found = options.find(opt => opt.value === value);
        if(found) setSelectedOption(found);
      } else {
        setSelectedOption(value);
      }
    }
  }, [value, options]);

  const handleOptionClick = (option) => {
    setSelectedOption(option);
    setIsDromdownOpen(false);
    // Call onChange with the proper value:
    // If the option is an object, return its "value" (e.g. the vehicle id).
    if (onChange) {
      onChange(typeof option === "object" ? option.value : option);
    }
  };

  return (
    <div ref={ref} className={`drop-menu  ${isDromdownOpen ? "active" : ""} `}>
      <div className="select" onClick={() => setIsDromdownOpen((pre) => !pre)}>
        <span>
          {typeof selectedOption === "object" ? selectedOption.label : selectedOption}
        </span>
        <i className="fa fa-angle-down" />
      </div>
      <ul
        className="dropdown"
        style={
          isDromdownOpen
            ? {
                display: "block",
                opacity: 1,
                visibility: "visible",
                transition: "0.4s",
              }
            : {
                display: "block",
                opacity: 0,
                visibility: "hidden",
                transition: "0.4s",
              }
        }
      >
        {options.map((option, index) => (
          <li key={index} onClick={() => handleOptionClick(option)}>
            {typeof option === "object" ? option.label : option}
          </li>
        ))}
      </ul>
    </div>
  );
}
