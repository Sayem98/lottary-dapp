import React from "react";
import { useState } from "react";
import { useEth } from "../contexts/EthContext";
import { Button } from "react-bootstrap";
import classes from "../styles/WinnerSelection.module.css";
import { useEffect } from "react";
function WinnerSelection() {
  const [winner, setWinner] = useState();
  const {
    state: { contract, accounts },
  } = useEth();

  useEffect(() => {
    const getWinner = async () => {};
    if (contract) {
      getWinner();
    }
  }, [contract]);
  const handleClick = async () => {
    await contract.methods.Winner().send({ from: accounts[0] });
    let options = {
      filter: {
        value: [],
      },
      fromBlock: 0,
    };
    await contract.events.WinnerSelected(options).on("data", (event) => {
      setWinner(event.returnValues._winner);
      console.log("event:" + event.returnValues._winner);
    });
  };
  return (
    <div className={classes.winner}>
      <p>{winner ? winner : "Waiting for admin to select winner !"}</p>
      <Button onClick={handleClick} className={classes.btn}>
        Winner
      </Button>
    </div>
  );
}

export default WinnerSelection;
