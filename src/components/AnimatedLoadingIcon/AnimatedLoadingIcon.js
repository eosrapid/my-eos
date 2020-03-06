import React from "react";
import classnames from "classnames";
import { animatedLoadingIcon } from "./AnimatedLoadingIcon.module.scss";

const AnimatedLoadingIcon = ({ className }) => {
  return (
    <div className={classnames(animatedLoadingIcon, className)}>
      Loading...
    </div>
  );
};

export default AnimatedLoadingIcon;
