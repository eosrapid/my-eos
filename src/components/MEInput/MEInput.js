import React from "react";
import classnames from "classnames";
import { meInput } from "./MEInput.module.scss";

const MEInput = ({ className, value, onChange, ...props }) => {
  return (
      <input className={classnames(meInput, className)} value={value} onChange={onChange} {...props} />

  );
};

export default MEInput;
