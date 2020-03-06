import React from "react";
import classnames from "classnames";
import MEWidget from '@/components/MEWidget';
import AnimatedLoadingIcon from '@/components/AnimatedLoadingIcon';

import { txProcessingWidget } from "./TXProcessingWidget.module.scss";

const TXProcessingWidget = ({ className }) => {
  return (
    <MEWidget className={classnames(txProcessingWidget, className)}>
      <div className="widgetTop">
        <div className="widgetTitle">Processing Transaction</div>
      </div>
      <div className="widgetMid">
        <AnimatedLoadingIcon />
      </div>
    </MEWidget>
  );
};

export default TXProcessingWidget;
