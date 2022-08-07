import React from "react";
import classes from "../styles/RightSide.module.css";
import Lottary from "./Lottary";

import WinnerSelection from "./WinnerSelection";
function RightSide() {
  return (
    <div className={classes.rightside}>
      <Lottary />
      <WinnerSelection />
    </div>
  );
}

export default RightSide;
