import React from "react";
import { meButton } from "./MEButton.module.scss";
import classnames from "classnames";

export default ({ className, children, ...props }) => {
  return (
    <button className={classnames(meButton, className)} {...props}>
      {children}
    </button>
  );
};
