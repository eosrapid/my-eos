import React from "react";
import { walletPickerWidget } from "./WalletPickerWidget.module.scss";
import classnames from "classnames";
import MEWidget from '@/components/MEWidget';
import MEButton from '@/components/MEButton';
import WalletPicker from '@/components/WalletPicker';
import { connect, actions } from "@/store";
function modalIdForWalletType(newType) {
  return "w_" + newType;

}
const WalletPickerWidget = ({ className, coreInstance, setOpenModal, myEosTitle }) => {
  const onSelectWalletType = (newType) => {
    setOpenModal({ modalId: modalIdForWalletType(newType) });
  };
  return (
    <MEWidget className={classnames(walletPickerWidget, className)}>
      <div className="widgetTop">
        <div className="widgetTitle">Login with <span className="myEOSTitle">{myEosTitle||"myEOS"}</span></div>
      </div>

      <div className="widgetMid">
        <div className="widgetHint">Please select a wallet to login.</div>
        <div className="widgetBody">
          <WalletPicker
            onSelect={(v) => onSelectWalletType(v)}
          />
        </div>
      </div>

      <div className="widgetFooter">
        <div className="widgetFooterControls">
          <MEButton
            onClick={() => {
              coreInstance.cancelActiveAction();
            }}
          >Cancel</MEButton>
        </div>
      </div>
    </MEWidget>
  );
};

export default connect(
  ({
    coreInstance,
    myEosTitle,
  }) => ({
    coreInstance,
    myEosTitle,
  }),
  actions
)(WalletPickerWidget);
