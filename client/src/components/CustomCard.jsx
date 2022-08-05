import React from "react";
import { Card, ListGroup, Button } from "react-bootstrap";
function CustomCard({ classes, balance, players, trnx, handleClick }) {
  return (
    <Card>
      <Card.Body>
        <Card.Title className={classes.title}>Lottary</Card.Title>
        <Card.Text className={classes.info}>
          <ListGroup>
            Current balance: {balance ? balance + " Eth" : "Getting balance"}
          </ListGroup>
          <ListGroup className={classes.players}>
            {players
              ? players.map((e, i) => <ListGroup key={i}>{e}</ListGroup>)
              : "Getting Player"}
          </ListGroup>
          <ListGroup>
            {trnx ? trnx : "Waiting for new transaction..."}
          </ListGroup>
          <Button className={classes.btn} variant="dark" onClick={handleClick}>
            Join Lottary
          </Button>
        </Card.Text>
      </Card.Body>
    </Card>
  );
}

export default CustomCard;
