import React from "react";
import classes from "./styles.module.scss";

const ButtonPrimary = ({
  button_text,
  width,
  height,
  padding,
  borderRadius,
  icon,
  icon_two,
  onClick,
  number_text,
  ...props
}) => {
  return (
    <button
      className={`${classes.simple_btn}`}
      onClick={onClick}
      style={{ width, height, padding, borderRadius }}
      {...props}
    >
      {number_text && <span>{number_text}</span>}
      {icon}
      {button_text}
      {icon_two}
    </button>
  );
};

export default ButtonPrimary;
