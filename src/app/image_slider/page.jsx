"use client";
import React, { use } from "react";
import Image from "next/image";
import { useState } from "react";
import { FaGreaterThan, FaLessThan } from "react-icons/fa";
import Loader from "../components/Loader";
import ReturnBtn from "../components/ReturnBtn";

const Page = () => {
  const imageArr = [
    "https://fastly.picsum.photos/id/788/800/400.jpg?hmac=jWWvDHy4-7OjzsyvT7VJGfhlGmhavtwZgTC1FmQpd7w",
    "https://fastly.picsum.photos/id/217/800/400.jpg?hmac=5pdOxYZkceQGbQDvRvOginGMWeG2uAIQtpxvC7QCadQ",
    "https://fastly.picsum.photos/id/34/800/400.jpg?hmac=qatcj74QOxTslq0koUgrFWkfPk8rTbAqJAFfoaLDBMY",
    "https://fastly.picsum.photos/id/29/800/400.jpg?hmac=4BwU0PCkgnRLKHZ7WvNu57cW4d8x2Aqm60d2E5CKXrQ",
  ];

  const [current, setCurrent] = useState(0);
  const [isLoading, setIsLoading] = useState(false);

  function forward() {
    setIsLoading(true);
    if (current < imageArr.length - 1) {
      setCurrent(current + 1);
    } else {
      setCurrent(0);
    }
  }

  function backward() {
    setIsLoading(true);
    if (current > 0) {
      setCurrent(current - 1);
    } else {
      setCurrent(imageArr.length - 1);
    }
  }

  return (
    <div className="w-full h-screen bg-gray-300 flex flex-col p-20 gap-10 justify-start items-center">
      <ReturnBtn />
      <h1 className="text-3xl font-bold">Image Slider Demo</h1>
      <div className="relative">
        {isLoading && (
          <div className="flex  w-full h-full absolute top-0 left-0 text-4xl items-center justify-center ">
            <Loader />
          </div>
        )}
        <button
          className="absolute active:scale-90 top-1/2 left-0 rounded-full p-4 bg-white translate-[-50%] shadow-lg"
          onClick={backward}
        >
          <FaLessThan />
        </button>
        <button
          className="absolute  active:scale-90 top-1/2 right-0 rounded-full p-4 bg-white translate-y-[-50%] translate-x-1/2 shadow-lg"
          onClick={forward}
        >
          <FaGreaterThan />
        </button>
        <Image
          src={imageArr[current]}
          width={800}
          height={400}
          alt="test"
          onLoadingComplete={() => {
            setIsLoading(false);
          }}
        ></Image>
      </div>
    </div>
  );
};

export default Page;
