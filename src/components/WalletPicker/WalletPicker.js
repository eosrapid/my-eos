import React from "react";
import { walletPicker } from "./WalletPicker.module.scss";
import classnames from "classnames";
import {ImTokenIcon, KeyIcon, ScatterIcon, TokenPocketIcon} from '@/components/SVGIcons';

import WalletPickerItem from "./WalletPickerItem";
const WALLET_DEFS = [
  {
    id: "scatter",
    label: "Scatter",
    svgIcon: ScatterIcon,
  },
  {
    id: "imtoken",
    label: "imToken",
    svgIcon: ImTokenIcon,
  },
  {
    id: "tokenpocket",
    label: "TokenPocket",
    svgIcon: TokenPocketIcon,
  },
  {
    id: "private_key",
    label: "Private Key",
    svgIcon: KeyIcon,
  }
];
export default ({ className, onSelect }) => {
  return (
    <div className={classnames(walletPicker, className)}>
      <div className="walletTypeSelector">
        {WALLET_DEFS.map(wd => (
          <WalletPickerItem
            key={wd.id}
            label={wd.label}
            icon={wd.icon}
            svgIcon={wd.svgIcon}
            iconAlt={wd.label}
            onClick={() => onSelect(wd.id)}
          />
        ))}
      </div>
    </div>
  );
};
