import React from "react";
import classnames from "classnames";
import { labelInput } from "./LabelInput.module.scss";

const LabelInput = ({ className, label, children }) => {
  return (
    <div className={classnames(labelInput, className)}>
      <div className="liLabel">{label}</div>
      <div className="liInputCon">{children}</div>
    </div>
  );
};

export default LabelInput;
