import React from "react";
import classes from "../styles/Layout.module.css";

function Layout({ children }) {
  return <div className={classes.layout}>{children}</div>;
}

export default Layout;
