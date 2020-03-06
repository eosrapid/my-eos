import React from "react";
import classnames from "classnames";
import { checkmarkCon } from "./AnimatedCheckMark.module.scss";

const AnimatedCheckMark = ({ className }) => {
  return (
    <div className={classnames(checkmarkCon, className)}>
      <svg className="checkmark" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 52 52" width="52" height="52">
        <circle className="chkMarkCircle" cx="26" cy="26" r="25" fill="none" />
        <path className="chkMarkCheck" fill="none" d="M14.1 27.2l7.1 7.2 16.7-16.8" />
      </svg>
    </div>

  );
};

export default AnimatedCheckMark;
