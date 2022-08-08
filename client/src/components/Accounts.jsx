import React from "react";
import { useEth } from "../contexts/EthContext";
import { Card, ListGroup } from "react-bootstrap";
import classes from "../styles/Accounts.module.css";
import { useState } from "react";
import { useEffect } from "react";

function Accounts() {
  const {
    state: { contract, accounts, web3 },
  } = useEth();
  const [lottary, setLottary] = useState();
  const [change, setChange] = useState("");
  const [balance, setBalance] = useState();
  const [players, setPlayers] = useState();
  const [winners, setWinners] = useState();

  useEffect(() => {
    const myTotalLottary = async () => {
      setLottary(
        await contract.methods.getLottaryNumber().call({ from: accounts[0] })
      );
    };
    const checkEvent = async () => {
      await contract.events.Perticepated((error, event) => {
        //console.log(event);
        setChange((prevChange) => {
          return !prevChange;
        });
      });
      await contract.events.WinnerSelected((error, event) => {
        //console.log(event);
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
        setBalance(web3.utils.fromWei(bal, "ether"));
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
    let options = {
      filter: {
        //Only get events where transfer value was 1000 or 1337
      },
      fromBlock: 0, //Number || "earliest" || "pending" || "latest"
      toBlock: "latest",
    };
    const getPastWinners = async () => {
      await contract.getPastEvents(
        "WinnerSelected",
        options,
        (error, events) => {
          setWinners(events);
          console.log(events);
          console.log(contract);
        }
      );
    };
    if (contract) {
      myTotalLottary();
      checkEvent();
      getBalance();
      getTotalPlayer();
      getPastWinners();
    }
  }, [contract, accounts, change, web3]);

  return (
    <div className={classes.accounts}>
      <Card className={classes.account}>
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
      <div className={classes.winners}>
        <h2>Winners</h2>
        {winners && winners.length !== 0
          ? winners.map((element, index) => (
              <ListGroup key={index}>{element.returnValues._winner}</ListGroup>
            ))
          : "No winners"}
      </div>
    </div>
  );
}

export default Accounts;
