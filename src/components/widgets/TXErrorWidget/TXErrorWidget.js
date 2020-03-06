import React from "react";
import classnames from "classnames";
import { txErrorWidget } from "./TXErrorWidget.module.scss";

const TXErrorWidget = ({ className }) => {
  return (
    <div className={classnames(txErrorWidget, className)}>
      Hello
    </div>
  );
};

export default TXErrorWidget;
