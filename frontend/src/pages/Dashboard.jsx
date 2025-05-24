import React from "react";
import Candidates from "../component/Candidates";
import { useState, useEffect } from "react";
import { Link  } from "react-router-dom";

import UploadResume from "../component/UploadResume";

const Dashboard = () => {
    let handleClick = async () => {
    let data = await fetch(
      `${import.meta.env.VITE_API_URL}/export`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/pdf",
        },
      }
    );
    const blob = await data.blob();
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "candidates.pdf";
    a.click();
  }

  return (
    <div className="flex">
      <div className="h-[100vh] w-1/4 border-e border-slate-300">
        {/* first */}
        <div className=" text-center py-6 px-3 flex flex-col gap-5">
          <h1 className="text-xl font-semibold">Next Chapter</h1>

          <input
            type="text"
            placeholder="what are you looking for?"
            className="border border-slate-300 rounded-md px-4 py-1"
          />
        </div>

        {/* second */}
        <div className=" font-semibold text-slate-700 flex flex-col justify-between h-[75%] px-4 text-zinc-500">
          <div className="flex flex-col gap-2">
            <div className="">
              <h1 className="py-2">Personal</h1>
              <div>
                <p className="px-6 py-2 hover:border-e hover:text-black">
                  DashBoard
                </p>
                <p className="px-6 py-2 hover:border-e hover:text-black">
                  Inbox
                </p>
                <p className="px-6 py-2 hover:border-e hover:text-black">
                  Calender
                </p>
              </div>
            </div>
            <div className="">
              <h1 className="py-2">Recrument</h1>
              <div>
                <p className="px-6 py-2 hover:border-e hover:text-black">
                  position
                </p>
                <p className="px-6 py-2 hover:border-e hover:text-black">
                  candidate reposetry
                </p>
                <p className="px-6 py-2 hover:border-e hover:text-black">
                  company profile
                </p>
              </div>
            </div>
          </div>
          <div className="pb-2">
            <p className="px-6 py-2 hover:border-e hover:text-black">Support</p>
            <p className="px-6 py-2 hover:border-e hover:text-black">Setting</p>
          </div>
        </div>

        <div className="flex h-14 items-center gap-3 px-4 border-t border-slate-300">
          <img
            src="https://www.akamai.com/site/im-demo/perceptual-standard.jpg?imbypass=true"
            alt=""
            className="w-10 h-10 rounded-full"
          />
          <div>
            <p className="font-semibold">Kami</p>
            <p className="text-zinc-600">hello@gmail.com</p>
          </div>
        </div>
      </div>

      {/*   for the big half */}
      <div className=" w-full px-4">
        {/* first nav */}
        <div className="flex justify-between my-5 ">
          <div>
            <h1 className="text-xl font-semibold">Candidates</h1>
            <p className="text-zinc-500">
              Browse and manage all the candiates for this postion
            </p>
          </div>
          <div className="flex gap-2 items-center">
            <Link className="bg-white h-fit py-1 px-2 border border-slate-400 rounded-md " to="/add">
              Add
            </Link>
            <button className="bg-white h-fit py-1 px-2 border border-slate-400 rounded-md " onClick={handleClick}>
              Export
            </button>
            <UploadResume />
          </div>
        </div>
        {/* second nav */}
        <div className="flex gap-4 border-b border-slate-200 pb-2 text-zinc-600">
          <p>
            To Review{" "}
            <span className="border border-slate-200 text-[10px] p-[2px]">
              35
            </span>
          </p>
          <p>
            Recomended{" "}
            <span className="border border-slate-200 text-[10px] p-[2px]">
              35
            </span>
          </p>
          <p>
            Accepted{" "}
            <span className="border border-slate-200 text-[10px] p-[2px]">
              35
            </span>
          </p>
          <p>
            offer send{" "}
            <span className="border border-slate-200 text-[10px] p-[2px]">
              35
            </span>
          </p>
          <p>
            Rejected{" "}
            <span className="border border-slate-200 text-[10px] p-[2px]">
              35
            </span>
          </p>
        </div>
        {/* third main */}
        {/* <div> */}
          {/* third nav */}
          {/* <div className="flex justify-between py-[18px] ">
            <p className="text-zinc-600">Showing 36 out of 36</p>
            <div className="flex gap-3">
              <input
                type="text"
                placeholder="search for a candidate..."
                className="border border-slate-300  rounded-md ps-4"
                onChange={handleChange}
              />

              {dropdown === true && (
                <div className="absolute mt-10 bg-white w-70 border border-slate-400 py-2 rounded-md">
                  {search.length > 0 && (
                    <div className="mx-2">
                      {search.map((candidate) => (
                        <p
                          key={candidate._id}
                          className="border-t py-1 px-2 border-slate-400"
                        >
                          {candidate.Name}
                        </p>
                      ))}
                    </div>
                  )}
                </div>
              )}
              <button className="border border-slate-200 px-2 py-1 rounded-md">
                Filters
              </button>
            </div>
          </div> */}
          {/* main */}
          {/* <div className="border border-slate-300 rounded-md">
            <div className="flex border-b border-slate-300 pb-2  p-3 bg-slate-200 text-zinc-600 rounded-md">
              <p className="w-[10%] ">
                <span className="border px-1 rounded-sm">-</span>
              </p>
              <p className="w-[28%]">Name</p>
              <p className="w-[10%]">Status</p>
              <p className="w-[10%]">Ai Rating</p>
              <p className="w-[10%]">Applied on</p>
              <p className="w-[20%]">Tags</p>
              <p className="w-[10%] text-end">:</p>
            </div>
            <div className=" overflow-y-scroll h-[68vh] bg-slate-100">
              <Candidates />
            </div>
          </div>
        </div> */}
         <Candidates />
      </div>
    </div>
  );
};

export default Dashboard;
