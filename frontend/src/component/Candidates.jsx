import React from "react";

const Candidates = ({data}) => {


  return (
    <>
      {data.map((candidate,idx) => (
          <div key={idx} className="flex  border-b border-slate-300  py-3 p-3 text-zinc-600">
      <p className="w-[10%] flex items-center">
        <input type="checkbox" className="border px-1 rounded-sm size-5"/>
      </p>
      <div className="w-[30%] flex items-center gap-4 ">
        <div>
          <img
            src={candidate.ImageUrl}
            alt=""
            className="w-10 h-10 rounded-full"
          />
        </div>
        <div>
          <p className="text-black">{candidate.Name}</p>
        <p>a{candidate.EmailId}</p>
        </div>
      </div>
      <p className="w-[10%]">
        <span className="p-1 rounded-md bg-green-200 text-green-900">{candidate.Status}</span>
      </p>
      <p className="w-[10%]">{candidate.AiRating}%</p>
      <p className="w-[10%]">{candidate.AppliedOn.split("T")[0]}</p>
      <p className="w-[20%]">{candidate.Tag}</p>
      <div className="w-[10%] flex justify-between">
        <button className="border px-2 h-9 rounded-sm border-slate-400">View CV</button>
        <p>:</p>
      </div>
    </div>
      ))}
    </>
  );
};

export default Candidates;
