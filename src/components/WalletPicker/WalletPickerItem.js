import React from "react";
import { walletPickerItem } from "./WalletPickerItem.module.scss";
import classnames from "classnames";

export default ({ className, icon, svgIcon, label, iconAlt, onClick }) => {
  const SvgIconComp = svgIcon?svgIcon:null;
  return (
    <div className={classnames(walletPickerItem, className)} onClick={onClick}>
      <div className="wtiImageCon">
        {icon ? <img src={icon} alt={iconAlt} className="wtiImage wtiNormalImage" /> : null}
        {SvgIconComp?<SvgIconComp className="wtiImage wtiSvgImage" />:null}
      </div>
      <div className="wtiTitle">{label}</div>
    </div>
  );
};
