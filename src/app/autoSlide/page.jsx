"use client";
import React from "react";
import Image from "next/image";
import { useState, useEffect } from "react";

const Page = () => {
  const imageArr = [
    "https://fastly.picsum.photos/id/217/800/400.jpg?hmac=5pdOxYZkceQGbQDvRvOginGMWeG2uAIQtpxvC7QCadQ",
    "https://fastly.picsum.photos/id/324/800/400.jpg?hmac=2mg8hcRfd1s1--TEoZBwlIv47YDd0Laxvb7jcvxdLHw",
    "https://fastly.picsum.photos/id/730/800/400.jpg?hmac=bOhadsNCkBj6H-NMsGiz_f2DYLQNtzEMbq4dQHsxtqc",
    "https://fastly.picsum.photos/id/29/800/400.jpg?hmac=4BwU0PCkgnRLKHZ7WvNu57cW4d8x2Aqm60d2E5CKXrQ",
    "https://fastly.picsum.photos/id/259/800/400.jpg?hmac=o6gaea2_T-I_MbuOvDfBUZ868zU9TahCeDOkBWwFaO0",
    "https://fastly.picsum.photos/id/482/800/400.jpg?hmac=Ya2FC9Fs-YCHJ5unq3UIPmevUEe_aq2rdrjEAw_aUjI",
    "https://fastly.picsum.photos/id/34/800/400.jpg?hmac=qatcj74QOxTslq0koUgrFWkfPk8rTbAqJAFfoaLDBMY",
    "https://fastly.picsum.photos/id/120/800/400.jpg?hmac=Nr7MCjlHPf_kR16Zp3X8o3MYZJUcq6La-ihmYRZeThg",
    "https://fastly.picsum.photos/id/356/800/400.jpg?hmac=r99YYxoFbrKLFr9w08dNXfRZv8yjNa0E6svuL9VYGKg",
    "https://fastly.picsum.photos/id/924/800/400.jpg?hmac=kK6jMUpWy_qdrgRS3okDi53hovmaA0Xdfaec7E2MSHA",
    "https://fastly.picsum.photos/id/788/800/400.jpg?hmac=jWWvDHy4-7OjzsyvT7VJGfhlGmhavtwZgTC1FmQpd7w",
  ];
  const [position, setPosition] = useState(0);
  useEffect(() => {
    const interval = setInterval(() => {
      setPosition((prevPosition) => (prevPosition + 800) % (imageArr.length * 800));
    }, 2000);

    return () => clearInterval(interval);
  }, [imageArr.length]);

  return (
    <div className="w-full h-screen flex flex-col items-center p-20 gap-20 ">
      <h1 className="text-2xl font-semibold">AutoSlide</h1>
      <div className="flex w-[800px] border overflow-hidden">
        <div
          className={`flex  duration-500 ease-out w-[8800px] outline-4 outline-red-600`}
          style={{ transform: `translateX(-${position}px)` }}
        >
          {imageArr.map((img, index) => {
            return (
              <Image
                src={img}
                key={index}
                width={800}
                height={400}
                className="w-[800px] shrink-0"
                alt="Autoslide image"
              />
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default Page;
