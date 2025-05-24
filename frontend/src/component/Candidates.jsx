import React from "react";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import EditCandidate from "./EditCandidate";
const Candidates = () => {
  const [data, setData] = useState([]);
  const [openDropdown, setOpenDropdown] = useState(null);

  let handleDelete = async (id) => {
    let data = await fetch(`${import.meta.env.VITE_API_URL}/candidates/${id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
    });
    let result = await data.json();
    if (result != null) {
      console.log(result);
      alert("Deleted Successfully");
    } else {
      alert("Error in Deletion");
    }
  };

  useEffect(() => {
    let handleData = async () => {
      let data = await fetch(`${import.meta.env.VITE_API_URL}/candidates`);
      let result = await data.json();
      if (result) {
        setData(result);
      }
    };
    handleData();
  }, [handleDelete]);

  return (
    <>
      {data.map((candidate, idx) => (
        <div
          key={idx}
          className="flex  border-b border-slate-300  py-3 p-3 text-zinc-600"
        >
          <p className="w-[10%] flex items-center">
            <input type="checkbox" className="border px-1 rounded-sm size-5" />
          </p>
          <div className="w-[30%] flex items-center gap-4 ">
            <div>
              <img
                src={candidate.image}
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
            <span className="p-1 rounded-md bg-green-200 text-green-900">
              {candidate.Status}
            </span>
          </p>
          <p className="w-[10%]">{candidate.AiRating}%</p>
          <p className="w-[10%]">{candidate.AppliedOn.split("T")[0]}</p>
          <p className="w-[20%]">{candidate.Tag}</p>
          <div className="w-[10%] flex justify-between">
            <button className="border px-2 h-9 rounded-sm border-slate-400">
              View CV
            </button>
          </div>
          {/* Dropdown Trigger */}
          <div className="relative">
            <button
              className=" px-4 h-9 rounded-sm border-slate-400"
              onClick={() =>
                setOpenDropdown(
                  openDropdown === candidate._id ? null : candidate._id
                )
              }
            >
              ⋮
            </button>

            {/* Dropdown Menu */}
            {openDropdown === candidate._id && (
              <div className="absolute right-0 mt-2 w-24 bg-white border border-gray-300 rounded shadow-md z-10">
                <EditCandidate Candidate_id={candidate._id} />
                <button
                  onClick={() => handleDelete(candidate._id)}
                  className="block w-full text-left px-4 py-2 hover:bg-red-100 text-red-600"
                >
                  Delete
                </button>
              </div>
            )}
          </div>
        </div>
      ))}
    </>
  );
};

export default Candidates;
