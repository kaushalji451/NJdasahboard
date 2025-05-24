import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import EditCandidate from "./EditCandidate";
import BulkUpdate from "./BulkUpdate";
const Candidates = () => {
  const [data, setData] = useState([]);
  const [searchInput, setSearchInput] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [filteredData, setFilteredData] = useState(null);
  const [dropdown, setDropdown] = useState(false);
  const [openDropdown, setOpenDropdown] = useState(null);

  // Handle text input
  const handleChange = async (e) => {
    const value = e.target.value;
    setSearchInput(value);

    if (value === "") {
      setSearchResults([]);
      setDropdown(false);
    } else {
      try {
        const res = await fetch(
          `${import.meta.env.VITE_API_URL}/candidates/search?name=${value}`
        );
        const result = await res.json();
        setSearchResults(result.data || []);
        setDropdown(true);
      } catch (err) {
        console.error("Search error:", err);
        setSearchResults([]);
        setDropdown(false);
      }
    }
  };

  // Final search (triggered on button click)
  const handleSearchClick = () => {
    if (searchResults.length > 0) {
      setFilteredData(searchResults);
      setSearchInput("");
    }
    setDropdown(false);
  };

  const handleResetSearch = () => {
    setSearchInput("");
    setSearchResults([]);
    setFilteredData(null);
    setDropdown(false);
  };

  // Fetch all data
  const fetchData = async () => {
    const res = await fetch(`${import.meta.env.VITE_API_URL}/candidates`);
    const result = await res.json();
    if (result) setData(result);
  };

  const handleDelete = async (id) => {
    const res = await fetch(
      `${import.meta.env.VITE_API_URL}/candidates/${id}`,
      {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
      }
    );
    const result = await res.json();
    if (result) {
      alert("Deleted Successfully");
      fetchData();
    } else {
      alert("Error in Deletion");
    }
  };

  useEffect(() => {
    fetchData();
    console.log("Data fetched successfully");
  }, []);

  const displayData = filteredData !== null ? filteredData : data;

  const [ids, setIds] = useState([]);
  const handleCheckBox = (id, checked) => {
    if (checked) {
      setIds((prev) => [...prev, id]);
    } else {
      setIds((prev) => prev.filter((item) => item !== id));
    }
  };

  return (
    <div>
      {/* Third Nav */}
      <div className="flex justify-between py-[18px] ">
        <p className="text-zinc-600">
          Showing {displayData.length} out of {data.length}
        </p>
        <div className="flex gap-3 relative">
          <div>
            <BulkUpdate ids={ids} setIds={setIds} refreshCallback={fetchData} />
          </div>
          <input
            type="text"
            placeholder="Search for a candidate..."
            className="border border-slate-300 rounded-md ps-4"
            value={searchInput}
            onChange={handleChange}
          />

          {dropdown && (
            <div className="absolute top-10 bg-white w-72 border border-slate-400 py-2 rounded-md z-10 max-h-52 overflow-y-auto">
              {searchResults.length > 0 ? (
                <div className="mx-2">
                  {searchResults.map((candidate) => (
                    <p
                      key={candidate._id}
                      className="border-t py-1 px-2 border-slate-400 cursor-pointer hover:bg-slate-100"
                      onClick={() => {
                        setFilteredData([candidate]);
                        setSearchInput("");
                        setDropdown(false);
                      }}
                    >
                      {candidate.Name}
                    </p>
                  ))}
                </div>
              ) : (
                <p className="text-center text-gray-400">No results found</p>
              )}
            </div>
          )}

          <button
            onClick={handleSearchClick}
            className="border border-slate-200 px-2 py-1 rounded-md"
          >
            Search
          </button>
          {filteredData !== null && (
            <button
              onClick={handleResetSearch}
              className="border border-slate-200 px-2 py-1 rounded-md bg-red-100 text-red-700"
            >
              Reset
            </button>
          )}
        </div>
      </div>

      {/* Main Candidate Table */}
      <div className="border border-slate-300 rounded-md">
        <div className="flex border-b border-slate-300 pb-2 p-3 bg-slate-200 text-zinc-600 rounded-md">
          <p className="w-[10%]">
            <span className="border px-1 rounded-sm">-</span>
          </p>
          <p className="w-[28%]">Name</p>
          <p className="w-[10%]">Status</p>
          <p className="w-[10%]">AI Rating</p>
          <p className="w-[10%]">Applied on</p>
          <p className="w-[20%]">Tags</p>
          <p className="w-[10%] text-end">:</p>
        </div>
        <div className="overflow-y-scroll h-[68vh] bg-slate-100">
          {displayData.map((candidate, idx) => (
            <div
              key={candidate._id}
              className="flex border-b border-slate-300 py-3 p-3 text-zinc-600"
            >
              <p className="w-[10%] flex items-center">
                <input
                  type="checkbox"
                  className="border px-1 rounded-sm size-5"
                  checked={ids.includes(candidate._id)}
                  onChange={(e) =>
                    handleCheckBox(candidate._id, e.target.checked)
                  }
                />
              </p>
              <div className="w-[30%] flex items-center gap-4">
                <img
                  src={candidate.image}
                  alt="Profile"
                  className="w-10 h-10 rounded-full"
                />
                <div>
                  <p className="text-black">{candidate.Name}</p>
                  <p>{candidate.EmailId}</p>
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
                  className="px-4 h-9 rounded-sm border-slate-400"
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
        </div>
      </div>
    </div>
  );
};

export default Candidates;
