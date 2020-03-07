import React, { useState, useEffect } from "react";
import classnames from "classnames";
import { authPrivateKeyWidget } from "./AuthPrivateKeyWidget.module.scss";

import MEWidget from '@/components/MEWidget';
import MEButton from '@/components/MEButton';
import PrivateKeyForm from '@/components/PrivateKeyForm/index'
import { connect, actions } from "@/store";

const AuthPrivateKeyWidget = ({ className, debugText, coreInstance, setOpenModal }) => {
  const [firstRun, setFirstRun] = useState(1)
  useEffect(() => {
    if (firstRun === 1) {
      setFirstRun(0);
    }
  }, [coreInstance, firstRun, setFirstRun]);


  return (
    <MEWidget className={classnames(authPrivateKeyWidget, className)}>
      <div className="widgetTop">
        <div className="widgetTitle">Please Enter Your Private Key</div>
      </div>

      <div className="widgetMid">
        <PrivateKeyForm
          onSubmit={({actor, permission, privateKey})=>{
            coreInstance.wallet.loginWithPrivateKeys([privateKey], [actor+"@"+permission])
            .then(() => 1)
            .catch(err => {
              console.error(err);

            })
          }}
        />
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
)(AuthPrivateKeyWidget);
