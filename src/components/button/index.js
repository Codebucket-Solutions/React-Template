import React from "react";
import classes from "./styles.module.scss";
import Star from "../../assets/images/star.webp";

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
  variant,
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
      {variant === "gradient_btn" && <img src={Star} alt="star" className={classes.star} />}
    </button>
  );
};

export default ButtonPrimary;
