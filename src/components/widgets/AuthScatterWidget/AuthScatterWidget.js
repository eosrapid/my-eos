import React, { useEffect, useState } from "react";
import { authScatterWidget } from "./AuthScatterWidget.module.scss";
import classnames from "classnames";
import MEWidget from '@/components/MEWidget';
import MEButton from '@/components/MEButton';
import { connect, actions } from "@/store";

const AuthScatterWidget = ({ className, debugText, scatterAppName, coreInstance, setOpenModal }) => {
  const [firstRun, setFirstRun] = useState(1)
  useEffect(() => {
    if (firstRun === 1) {
      setFirstRun(0);
      coreInstance.wallet.loginWithScatter(scatterAppName)
        .then(() => 1)
        .catch(err => {
          console.error(err);
          setTimeout(() => setFirstRun(1), 600);

        })
    }
  }, [coreInstance, scatterAppName, firstRun, setFirstRun]);


  return (
    <MEWidget className={classnames(authScatterWidget, className)}>
      <div className="widgetTop">
        <div className="widgetTitle">Logging in with Scatter...</div>
      </div>

      <div className="widgetMid">
        <div className="widgetHint">Note: A popup should have appeared if Scatter was open. If the popup is not visible, open the Scatter window and you should see authentication request..</div>
        <div className="widgetBody">
          <div className="scatterInstructionsCon">
            To continue, please select the account you wish to use in the Scatter popup.
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
)(AuthScatterWidget);
