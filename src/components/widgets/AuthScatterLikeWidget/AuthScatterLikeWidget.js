import React, { useEffect, useState } from "react";
import { authScatterLikeWidget } from "./AuthScatterLikeWidget.module.scss";
import classnames from "classnames";
import MEWidget from '@/components/MEWidget';
import MEButton from '@/components/MEButton';
import { connect, actions } from "@/store";

const AuthScatterLikeWidget = ({ title, hint, children, className, scatterAppName, coreInstance, setOpenModal }) => {
  const [firstRun, setFirstRun] = useState(1)
  useEffect(() => {
    if (firstRun === 1) {
      setFirstRun(0);
      coreInstance.wallet.loginWithScatter(scatterAppName)
        .then(() => console.log("login"))
        .catch(err => {
          console.error(err);
          setTimeout(() => setFirstRun(1), 600);
        })
    }
  }, [coreInstance, scatterAppName, firstRun, setFirstRun]);


  return (
    <MEWidget className={classnames(authScatterLikeWidget, className)}>
      <div className="widgetTop">
        <div className="widgetTitle">{title}</div>
      </div>

      <div className="widgetMid">
        {hint?<div className="widgetHint">{hint}</div>:null}
        <div className="widgetBody">
          <div className="scatterInstructionsCon">
            {children}
          </div>
        </div>
      </div>

      <div className="widgetFooter">
        <div className="widgetFooterControls">
          <MEButton
            onClick={()=>{
              setOpenModal({modalId: "login"})
            }}
          >Back</MEButton>
        </div>
      </div>
    </MEWidget>
  );
};

export default connect(
  ({
    coreInstance,
    scatterAppName,
  }) => ({
    coreInstance,
    scatterAppName,
  }),
  actions
)(AuthScatterLikeWidget);
