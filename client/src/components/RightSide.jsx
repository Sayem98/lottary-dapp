import React from "react";
import classes from "../styles/RightSide.module.css";
import Lottary from "./Lottary";
import Winner from "./Winner";
import WinnerSelection from "./WinnerSelection";
function RightSide() {
  return (
    <div className={classes.rightside}>
      <Winner />
      <Lottary />
      <WinnerSelection />
    </div>
  );
}

export default RightSide;
