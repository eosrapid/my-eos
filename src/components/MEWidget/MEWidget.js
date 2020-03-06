import React from "react";
import { meWidget } from "./MEWidget.module.scss";
import classnames from "classnames";

const MEWidget = ({ className, children }) => {
  return (
    <div className={classnames(meWidget, className)}>
      <div className="mainWidget">
        {children}
      </div>
    </div>
  );
};

export default MEWidget;
