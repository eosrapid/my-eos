import React from "react";
import classnames from "classnames";
import { txRequestWidget } from "./TXRequestWidget.module.scss";

const TXRequestWidget = ({ className }) => {
  return (
    <div className={classnames(txRequestWidget, className)}>
      Hello
    </div>
  );
};

export default TXRequestWidget;
