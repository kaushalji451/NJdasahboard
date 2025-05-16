import React from "react";

const User = () => {
  return (
    <div className="flex  border-b border-slate-300  py-3 p-3 text-zinc-600">
      <p className="w-[10%] flex items-center">
        <input type="checkbox" className="border px-1 rounded-sm size-5"/>
      </p>
      <div className="w-[30%] flex items-center gap-4">
        <div>
          <img
            src="https://www.akamai.com/site/im-demo/perceptual-standard.jpg?imbypass=true"
            alt=""
            className="w-10 h-10 rounded-full"
          />
        </div>
        <div>
          <p className="text-black">Abhishek kuamr kaushal</p>
        <p>abhi@gmail.com</p>
        </div>
      </div>
      <p className="w-[10%]">
        <span className="p-1 rounded-md bg-green-200 text-green-900">New</span>
      </p>
      <p className="w-[10%]">76%</p>
      <p className="w-[10%]">13/12/2023</p>
      <p className="w-[20%]">Average Protfolio</p>
      <p className="w-[10%] text-end">:</p>
    </div>
  );
};

export default User;
