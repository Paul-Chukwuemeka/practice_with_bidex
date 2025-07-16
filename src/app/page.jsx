"use client";
import Link from "next/link";

export default function Home() {
  return (
    <div className="flex flex-col items-center justify-center gap-5 h-fit min-h-screen">
      <h1 className="text-xl font-semibold">
        This are some works we use to practice React With Next js
      </h1>

      <Link href={"/Counter"}>
        <div className="p-4 rounded hover:scale-[1.1] hover:text-white bg-blue-300 hover:bg-blue-500">
          <h1 className="text-lg font-semibold">Counter</h1>
        </div>
      </Link>
      <Link href={"/Rps"}>
        <div className="p-4 rounded hover:scale-[1.1] hover:text-white bg-green-300 hover:bg-green-500">
          <h1 className="text-lg font-semibold">Rock paper Scissor</h1>
        </div>
      </Link>
      <Link href={"/image_slider"}>
      <button className="p-4 bg-red-300 rounded-lg font-semibold text-xl hover:scale-110 hover:bg-red-500 hover:text-white">
        Image Slider
      </button>
      </Link>
      <Link href={"/autoSlide"}>
      <button className="p-4 bg-amber-300 rounded-xl text-xl font-semibold hover:scale-110 hover:bg-amber-500 hover:text-white">
        AutoSlide
      </button>
      </Link>
    </div>
  );
}
