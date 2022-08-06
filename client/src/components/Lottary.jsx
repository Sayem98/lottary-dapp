import React from "react";
import { useEth } from "../contexts/EthContext";

import CustomCard from "./CustomCard";

import classes from "../styles/Lottary.module.css";
import { useEffect } from "react";
import { useState } from "react";

function Lorrary() {
  const {
    state: { contract, accounts, web3 },
  } = useEth();

  const [balance, setBalance] = useState();
  const [players, setPlayer] = useState();
  const [trnx, setTrnx] = useState();

  useEffect(() => {
    const getBalance = async () => {
      setBalance(
        web3.utils.fromWei(
          await contract.methods.getBalance().call({ from: accounts[0] })
        ),
        "ether"
      );
    };

    const getAllPlayer = async () => {
      setPlayer(
        await contract.methods.TotalParticipents().call({ from: accounts[0] })
      );
    };

    if (contract) {
      getBalance();
      getAllPlayer();
    }
  }, [contract, accounts, web3, trnx]);

  // console.log(state.accounts);
  const handleClick = () => {
    console.log("clicked");
    const joinLottary = async () => {
      console.log(contract);
      let one_eth = web3.utils.toWei("1", "ether");
      await web3.eth
        .sendTransaction({
          from: accounts[0],
          to: contract.options.address,
          value: one_eth,
        })
        .on("confirmation", (confirmationNumber, receipt) => {
          console.log(receipt);
          setTrnx(receipt.transactionHash);
        });

      console.log(contract);
    };

    if (contract) {
      joinLottary();
    } else {
    }
  };
  return (
    <CustomCard
      classes={classes}
      
      trnx={trnx}
      handleClick={handleClick}
    />
  );
}

export default Lorrary;
