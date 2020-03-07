import React from "react";
import classnames from "classnames";
import { txErrorWidget } from "./TXErrorWidget.module.scss";
import MEWidget from '@/components/MEWidget';
import MEButton from '@/components/MEButton';
import ErrorIcon from '@/components/SVGIcons/ErrorIcon';

import { connect, actions } from "@/store";

const TXErrorWidget = ({ className, openModalData,modalId, closeModal }) => {
  return (
    <MEWidget className={classnames(txErrorWidget, className)}>
      <div className="widgetTop">
        <div className="widgetTitle">Transaction Failed!</div>
      </div>

      <div className="widgetMid">
        <div className="errorIconCon">
          <ErrorIcon width={100} height={100} />
        </div>
        <div className="errorMsg">
          {typeof openModalData==='string'?openModalData:"Unknown Error!"}
        </div>
      </div>

      <div className="widgetFooter">
        <div className="widgetFooterControls">
          <MEButton
            onClick={() => {
              closeModal({modalId});
            }}
          >Ok</MEButton>
        </div>
      </div>
    </MEWidget>
  );
};


export default connect(
  ({
    modalId,
    openModalData,
  }) => ({
    modalId,
    openModalData,
  }),
  actions
)(TXErrorWidget);
