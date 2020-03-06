import React, { useState, useEffect } from "react";
import classnames from "classnames";
import { txSuccessWidget } from "./TXSuccessWidget.module.scss";
import MEWidget from '@/components/MEWidget';
import { connect, actions } from "@/store";
import AnimatedCheckMark from "@/components/AnimatedCheckMark";

const TXSuccessWidget = ({ className,closeModal,modalId }) => {
  const [firstRun, setFirstRun] = useState(1)
  useEffect(() => {
    if (firstRun === 1) {
      setFirstRun(0);
      setTimeout(() => closeModal({modalId}), 1400);

    }
  }, [firstRun, setFirstRun, closeModal,modalId]);
  return (
    <MEWidget className={classnames(txSuccessWidget, className)}>
      <div className="widgetTop">
        <div className="widgetTitle">Transaction Successful!</div>
      </div>

      <div className="widgetMid">
        <AnimatedCheckMark />
      </div>
    </MEWidget>
  );
};


export default connect(
  ({
    modalId,
  }) => ({
    modalId,
  }),
  actions
)(TXSuccessWidget);
