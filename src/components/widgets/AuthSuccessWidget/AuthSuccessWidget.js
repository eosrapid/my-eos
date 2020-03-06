import React, { useState, useEffect } from "react";
import classnames from "classnames";
import { authSuccessWidget } from "./AuthSuccessWidget.module.scss";
import MEWidget from '@/components/MEWidget';
import { connect, actions } from "@/store";
import AnimatedCheckMark from "@/components/AnimatedCheckMark";

const AuthSuccessWidget = ({ className, modalId, closeModal }) => {
  const [firstRun, setFirstRun] = useState(1)
  useEffect(() => {
    if (firstRun === 1) {
      setFirstRun(0);
      setTimeout(() => closeModal({modalId}), 1600);

    }
  }, [firstRun, setFirstRun, closeModal,modalId]);


  return (
    <MEWidget className={classnames(authSuccessWidget, className)}>
      <div className="widgetTop">
        <div className="widgetTitle">Login Successful!</div>
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
)(AuthSuccessWidget);
