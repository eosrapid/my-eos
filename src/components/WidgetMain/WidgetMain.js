import React from "react";
import { widgetMain } from "./WidgetMain.module.scss";
import classnames from "classnames";
import MEWidget from '@/components/MEWidget';
import WalletPickerWidget from '@/components/widgets/WalletPickerWidget';
import AuthScatterWidget from '@/components/widgets/AuthScatterWidget';
import AuthAnchorWidget from '@/components/widgets/AuthAnchorWidget';
import {AuthImTokenWidget, AuthTokenPocketWidget} from '@/components/widgets/AuthScatterLikeWidget';
import AuthPrivateKeyWidget from '@/components/widgets/AuthPrivateKeyWidget';
import AuthSuccessWidget from '@/components/widgets/AuthSuccessWidget';
// import TXRequestWidget from '@/components/widgets/TXRequestWidget';
import TXProcessingWidget from '@/components/widgets/TXProcessingWidget';
import TXErrorWidget from '@/components/widgets/TXErrorWidget';
import TXSuccessWidget from '@/components/widgets/TXSuccessWidget';

import { connect, actions } from "@/store";

const MissingWidget = () => <MEWidget>Missing Widget!</MEWidget>
const ELEMENT_FOR_MODAL_ID = {
  "login": WalletPickerWidget,
  "w_scatter": AuthScatterWidget,
  "w_anchor": AuthAnchorWidget,
  "w_private_key": AuthPrivateKeyWidget,
  "w_tokenpocket": AuthTokenPocketWidget,
  "w_imtoken": AuthImTokenWidget,
  "login_success": AuthSuccessWidget,
  "tx_processing": TXProcessingWidget,
  "tx_success": TXSuccessWidget,
  "tx_error": TXErrorWidget,
  
};
function getElementForModalId(modalId) {
  if (!modalId || modalId === "") {
    return null;
  }
  if (ELEMENT_FOR_MODAL_ID.hasOwnProperty(modalId)) {
    return ELEMENT_FOR_MODAL_ID[modalId];
  } else {
    console.error("Error in getElementForModalId, no Element defined for modalId '" + modalId + "'!");
    return MissingWidget;
  }

}
const WidgetMain = ({ className, modalId, modalOpen, openModalData }) => {
  const DisplayWidget = getElementForModalId(modalId);
  if (DisplayWidget === null || !modalOpen) {
    return <span style={{ display: "none", visibility: "hidden" }}></span>;
  }
  return (
    <div className={classnames(widgetMain, className)}>
      <div className="widgetCard">
        <DisplayWidget openModalData={openModalData} />
      </div>
    </div>
  );
};

export default connect(
  ({
    modalId,
    modalOpen,
    openModalData,
  }) => ({
    modalId,
    modalOpen,
    openModalData,
  }),
  actions
)(WidgetMain);
