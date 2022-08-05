import React from "react";
import { useState } from "react";
import { useEth } from "../contexts/EthContext";
import { Button, Card } from "react-bootstrap";
import classes from "../styles/WinnerSelection.module.css";
function WinnerSelection() {
  const [winner, setWinner] = useState();
  const {
    state: { contract, accounts },
  } = useEth();

  const handleClick = async () => {
    setWinner(await contract.methods.Winner().send({ from: accounts[0] }));
  };
  return (
    <Card className={classes.winner}>
      <p>
        {winner
          ? `The winner is ${winner}`
          : "Waiting for admin to select winner !"}
      </p>
      <Button onClick={handleClick} className={classes.btn}>
        Winner
      </Button>
    </Card>
  );
}

export default WinnerSelection;
