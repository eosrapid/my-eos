import React, { useState, useEffect } from "react";
import classnames from "classnames";
import { authLedgerWidget } from "./AuthLedgerWidget.module.scss";
import MEWidget from '@/components/MEWidget';
import MEButton from '@/components/MEButton';
import { connect, actions } from "@/store";

const AuthLedgerWidget = ({ className, coreInstance, setOpenModal }) => {
  const [firstRun, setFirstRun] = useState(1)
  useEffect(() => {
    if (firstRun === 1) {
      setFirstRun(0);

    }
  }, [coreInstance, firstRun, setFirstRun]);


  return (
    <MEWidget className={classnames(authLedgerWidget, className)}>
      <div className="widgetTop">
        <div className="widgetTitle">Logging in with Ledger...</div>
      </div>

      <div className="widgetMid">
        <div className="widgetHint">Note: LEDGER_NOTE_GOES_HERE</div>
        <div className="widgetBody">
          <div className="ledgerInstructionsCon">
            Note: Ledger is not yet supported!
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
  }) => ({
    coreInstance,
  }),
  actions
)(AuthLedgerWidget);
