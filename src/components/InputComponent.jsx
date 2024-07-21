import React, { useState } from "react";
import { Input } from "@nextui-org/react";
import { FaEye } from "react-icons/fa";
import { FaEyeSlash } from "react-icons/fa";

function InputComponent({
  label,
  type = "text",
  name,
  value,
  placeholder,
  onChange,
}) {
  const [isVisible, setIsVisible] = React.useState(false);

  const toggleVisibility = () => setIsVisible(!isVisible);
  return (
    <div className="flex w-60 justify-center flex-wrap md:flex-nowrap gap-4">
      {type === "password" ? (
        <>
          <Input
            label={label}
            value={value}
            name={name}
            onChange={onChange}
            placeholder={placeholder}
            endContent={
              <button
                className="focus:outline-none"
                type="button"
                onClick={toggleVisibility}
              >
                {isVisible ? <FaEyeSlash /> : <FaEye />}
              </button>
            }
            type={isVisible ? "text" : "password"}
            className="max-w-xs m-2 "
          />
        </>
      ) : (
        <Input
          type={type}
          label={label}
          value={value}
          name={name}
          onChange={onChange}
          placeholder={placeholder}
          className="m-2"
        />
      )}
    </div>
  );
}

export default InputComponent;
