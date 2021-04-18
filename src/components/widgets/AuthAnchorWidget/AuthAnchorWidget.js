import React, { useEffect, useState } from "react";
import { authAnchorWidget } from "./AuthAnchorWidget.module.scss";
import classnames from "classnames";
import MEWidget from '@/components/MEWidget';
import MEButton from '@/components/MEButton';
import { connect, actions } from "@/store";

const AuthAnchorWidget = ({ className, debugText, anchorAppName, coreInstance, setOpenModal }) => {
  const [firstRun, setFirstRun] = useState(1)
  useEffect(() => {
    if (firstRun === 1) {
      setFirstRun(0);
      coreInstance.wallet.loginWithAnchorLink(anchorAppName)
        .then(() => 1)
        .catch(err => {
          console.error(err);
          setTimeout(() => setFirstRun(1), 600);

        })
    }
  }, [coreInstance, anchorAppName, firstRun, setFirstRun]);


  return (
    <MEWidget className={classnames(authAnchorWidget, className)}>
      <div className="widgetTop">
        <div className="widgetTitle">Logging in with Anchor...</div>
      </div>

      <div className="widgetMid">
        <div className="widgetHint">Note: A popup should have appeared if Anchor was open. If the popup is not visible, open the Anchor window and you should see authentication request..</div>
        <div className="widgetBody">
          <div className="anchorInstructionsCon">
            To continue, please select the account you wish to use in the Anchor popup.
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
    anchorAppName,
  }) => ({
    coreInstance,
    anchorAppName,
  }),
  actions
)(AuthAnchorWidget);
