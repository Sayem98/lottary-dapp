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
  const [balance, setBalance] = useState();
  const [players, setPlayers] = useState();
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
    const getBalance = async () => {
      try {
        let bal = await contract.methods
          .getBalance()
          .call({ from: accounts[0] });
        setBalance(bal);
      } catch (err) {
        console.log(err);
      }
    };

    const getTotalPlayer = async () => {
      try {
        let all_players = await contract.methods
          .TotalParticipents()
          .call({ from: accounts[0] });
        setPlayers(all_players);
      } catch (err) {
        console.log(err);
      }
    };
    if (contract) {
      myTotalLottary();
      checkEvent();
      getBalance();
      getTotalPlayer();
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
      <div className={classes.tickets}>
        My Tickets: {lottary ? lottary + " Times" : "Waiting"}
      </div>
      <div className={classes.players}>
        <h1>Current</h1>
        <h2>Balance: {balance ? balance + " ETH" : "Waiting"}</h2>
        <h2>Total player: {players ? players.length : "Waiting"}</h2>
        {players && players.length ? (
          <>
            <h2>Players</h2>
            {players
              ? players.map((player, index) => (
                  <ListGroup className={classes.player} key={index}>
                    {player}
                  </ListGroup>
                ))
              : "Waiting"}
          </>
        ) : (
          "No Players"
        )}
      </div>
    </div>
  );
}

export default Accounts;
