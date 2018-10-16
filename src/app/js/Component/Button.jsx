import React, { Component } from "react";

const Button = props => {
  const { type, text, color, size, callBack, disabled } = props;
  let btnClass = [];
  if (type) btnClass.push(type);
  if (color) btnClass.push(color);
  if (size) btnClass.push(size);
  return (
    <button
      disabled={disabled}
      onClick={callBack}
      className={btnClass.join(" ")}
    >
      <span>{text}</span>
    </button>
  );
};

export default Button;
