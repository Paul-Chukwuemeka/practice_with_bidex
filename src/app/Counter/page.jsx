"use client";
import { useState } from "react";
import { FaPlus, FaMinus } from "react-icons/fa";
import ReturnBtn from "../components/ReturnBtn";
import { RiResetLeftFill } from "react-icons/ri";

const Page = () => {
  const [counterValue, setCounterValue] = useState(0);

  const increment = () => {
    setCounterValue(counterValue + 1);
  };
  const decrement = () => {
    // if (counterValue > 0) { // This check is useless because we implemented disables attribute
    setCounterValue(counterValue - 1);
    // } else {
    //   setCounterValue(counterValue);
    // return
    // }
  };

  const reset = () => {
    setCounterValue(0);
  };

  return (
    <div className="flex flex-col items-center h-screen p-20 gap-20">
        <ReturnBtn/>
      <h1 className="text-2xl font-semibold">COUNTER</h1>

      <div className="shadow-md h-40 p-4 flex flex-col items-center gap-5 justify-center">
        <h1 className="text-5xl font-semibold">{counterValue}</h1>
        <div className="flex text-xl items-center gap-4">
          <button
            className="border p-2 w-18 rounded-md bg-blue-600 hover:bg-blue-900 cursor-pointer text-white justify-center flex "
            onClick={increment}
          >
            <FaPlus className="w-fit" />
          </button>
          <button
            className=" w-18 rounded-md   cursor-pointer justify-center flex "
            onClick={reset}
          >
            <RiResetLeftFill />
          </button>
          <button
            className="border p-2 w-18 rounded-md bg-red-600 hover:bg-red-900 cursor-pointer text-white justify-center flex "
            onClick={decrement}
            disabled={counterValue == 0}
          >
            <FaMinus />
          </button>
        </div>
      </div>
    </div>
  );
};

export default Page;
