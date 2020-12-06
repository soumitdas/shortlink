import React, { useState, useRef } from "react";
import Button from "./Button";

const CopyLink = ({
  size = "",
  buttonType = "primary",
  fullWidth = false,
  value,
  onChange,
}) => {
  const [buttonText, setButtonText] = useState("Copy");
  const [buttonColor, setButtonColor] = useState(buttonType);
  const textAreaRef = useRef(null);

  const handleButtonClick = (e) => {
    textAreaRef.current.select();
    document.execCommand("copy");
    //e.target.focus();
    setButtonText("Copied");
    setButtonColor("success");
    setTimeout(() => {
      setButtonText("Copy");
      setButtonColor("primary");
      onChange();
    }, 1000);
  };

  return (
    <div className="field is-grouped">
      <p className="control is-expanded">
        <input
          className={`input is-${size}`}
          type="text"
          ref={textAreaRef}
          value={value}
          onChange={onChange}
        />
      </p>
      <p className="control">
        <Button
          onClick={handleButtonClick}
          type={buttonColor}
          size={size}
          fullWidth={fullWidth}
        >
          {buttonText}
        </Button>
      </p>
    </div>
  );
};

export default CopyLink;
