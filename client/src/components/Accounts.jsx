import React from "react";
import { useEth } from "../contexts/EthContext";
import { Card, ListGroup } from "react-bootstrap";
import classes from "../styles/Accounts.module.css";
import { useState } from "react";
import { useEffect } from "react";

function Accounts() {
  const {
    state: { contract, accounts },
  } = useEth();
  const [lottary, setLottary] = useState();
  const [change, setChange] = useState("");
  useEffect(() => {
    const myTotalLottary = async () => {
      setLottary(
        await contract.methods.getLottaryNumber().call({ from: accounts[0] })
      );
    };
    const checkEvent = async () => {
      await contract.events.Perticepated((error, event) => {
        console.log(event);
        setChange((prevChange) => {
          return !prevChange;
        });
      });
    };
    if (contract) {
      myTotalLottary();
      checkEvent();
    }
  }, [contract, accounts, change]);

  return (
    <div className={classes.accounts}>
      <div className={classes.account}>
        <Card>
          <Card.Body className={classes.body}>
            <Card.Title className={classes.title}>
              <h3>My Accounts</h3>
            </Card.Title>
            <Card.Text className={classes.text}>
              <ListGroup>
                {accounts
                  ? accounts.map((value, key) => (
                      <ListGroup.Item key={key}>{value}</ListGroup.Item>
                    ))
                  : "Null"}
              </ListGroup>
            </Card.Text>
          </Card.Body>
        </Card>
      </div>
      <div className={classes.activity}>
        My Lottary: {lottary ? lottary : "No"}
      </div>
    </div>
  );
}

export default Accounts;
