"use client";

import { useState } from "react";
import { FaHandPaper } from "react-icons/fa";
import { LiaHandRock } from "react-icons/lia";
import { FaHandScissors } from "react-icons/fa";
import ReturnBtn from "../components/ReturnBtn";

const Page = () => {
  const buttonStyle =
    "*:w-2/5 *:h-40 *:border-8 *:rounded-full text-6xl *:duration-250 *:flex *:items-center *:justify-center *:cursor-pointer *:hover:bg-gray-200 gap-5";

  const [userScore, setUserScore] = useState(0);
  const [computerScore, setComputerScore] = useState(0);
  const [winner, setWinner] = useState(null);

  const computerPick = () => Math.floor(Math.random() * 3) + 1;

  function rockFunc() {
    const pick = computerPick();
    if (pick == 1) {
      setWinner("tie");
    } else if (pick == 2) {
      setWinner("computer");
      setComputerScore(computerScore + 1);
    } else {
      setWinner("player");
      setUserScore(userScore + 1);
    }
  }

  function PaperFunc() {
    const pick = computerPick();
    if (pick == 1) {
      setWinner("player");
      setUserScore(userScore + 1);
    } else if (pick == 2) {
      setWinner("tie");
    } else {
      setWinner("computer");
      setComputerScore(computerScore + 1);
    }
  }
  function ScissorsFunc() {
    const pick = computerPick();
    if (pick == 1) {
      setWinner("computer");
      setComputerScore(computerScore + 1);
    } else if (pick == 2) {
      setWinner("player");
      setUserScore(userScore + 1);
    } else {
      setWinner("tie");
    }
  }

  return (
    <div className="flex flex-col items-center p-20 gap-5">
      <ReturnBtn />
      <div className="w-full flex justify-between text-xl font-semibold">
        <h3>Your Score : {userScore}</h3>
        <h3>Computer Score : {computerScore}</h3>
      </div>
      <h1 className="text-2xl font-semibold">Rock Paper Scissors</h1>
      <div
        className={`flex p-4 w-full items-center justify-center flex-wrap max-w-[450px] ${buttonStyle}`}
      >
        <button
          className="text-red-600 active:bg-red-600 active:text-white"
          onClick={rockFunc}
        >
          <LiaHandRock />
        </button>
        <button className="text-green-600  active:bg-green-600 active:text-white"
        onClick={PaperFunc}
        >
          <FaHandPaper />
        </button>
        <button className="text-blue-600  active:bg-blue-600 active:text-white"
        onClick={ScissorsFunc}
        >
          <FaHandScissors />
        </button>
      </div>
      <h2 className="text-xl">Computer picked something and you picked test</h2>
      <h2 className="text-xl">
        {winner == "computer" && "computer wins"}
        {winner == "player" && "You win"}
        {winner == "tie" && "Tie"}
      </h2>
    </div>
  );
};

export default Page;
