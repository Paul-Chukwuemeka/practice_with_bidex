import React from "react";
import Link from "next/link";
import { IoReturnDownBackSharp } from "react-icons/io5";

const ReturnBtn = () => {
  return (
   <Link href={"/"} className="cursor-pointer">
    <button
      title="Return Home"
      className="text-2xl border flex items-center justify-center w-15 rounded-lg bg-blue-600 text-white h-10 absolute left-10 top-10"
    >
      <IoReturnDownBackSharp />
    </button>
   </Link>
  );
};

export default ReturnBtn;
