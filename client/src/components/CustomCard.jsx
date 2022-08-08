import React from "react";

import { ListGroup, Button } from "react-bootstrap";
function CustomCard({ classes, trnx, handleClick }) {
  return (
    <div className={classes.lottary}>
      <h2 className={classes.title}>Join Lottary</h2>
      <ListGroup className={classes.info}>Lottary value: 0.1ETH</ListGroup>

      <ListGroup className={classes.info}>
        {trnx ? trnx : "Waiting for new transaction..."}
      </ListGroup>

      <Button className={classes.btn} variant="dark" onClick={handleClick}>
        Join
      </Button>
    </div>
  );
}

export default CustomCard;
