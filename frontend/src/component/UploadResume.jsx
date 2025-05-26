import React from "react";

import Popup from "reactjs-popup";
import "reactjs-popup/dist/index.css";
import { useState, useEffect } from "react";
const UploadResume = () => {
  const [form, setFormdata] = useState({
    username: "",
    resume: null,
  });

  const [search, setsearch] = useState("");
  const [dropdown, setdropdown] = useState(false);
  let handleChange = async (e) => {
    if (e.target.value === "") {
      setsearch("");
    } else {
      let data = await fetch(
        `${import.meta.env.VITE_API_URL}/candidates/search?name=${e.target.value}`
      );
      let result = await data.json();
      setsearch(result.data);
    }
  };

  useEffect(() => {
    if (search.length > 0) {
      setdropdown(true);
    } else {
      setdropdown(false);
    }
  }, [search]);

  let handleNameSubmit = (candidate) => {
    setFormdata({ ...form, username: candidate.username });
    setdropdown(false);
  };

  const handleClick = async (e,close) => {
    e.preventDefault();

    if (!form.username || !form.resume) {
      alert("Please fill in all fields");
      return;
    }
    const formData = new FormData();
    formData.append("username", form.username);
    formData.append("cvUrl", form.resume);

    try {
      let data = await fetch(`${import.meta.env.VITE_API_URL}/candidate/upload`, {
        method: "POST",
        body: formData,
      });
      let result = await data.json();
      if (result) {
        alert("Candidate added successfully");
        close()
      }
    } catch (error) {
      console.log("Error in adding candidate:", error);
    }
  };

  return (
    <div>
      <Popup
        trigger={
          <button className="bg-blue-600 text-white h-fit py-1 px-2 rounded-md">
            {" "}
            Upload CV{" "}
          </button>
        }
        modal
        nested
      >
        {(close) => (
          <div className="">
            <button className="" onClick={close}>
              &times;
            </button>
            <div>
              <h1 className="font-bold text-xl text-center">Upload Resume</h1>
              <form
                className="flex flex-col gap-4  items-center"
                onSubmit={(e)=>handleClick(e,close)}
              >
                <div className="flex  w-full justify-center">
                  <div className="flex flex-col ">
                    <label htmlFor="name">Find Candidate</label>
                    <input
                      type="text"
                      id="name"
                      name="username"
                      className="border px-2 py-1 rounded-md w-100"
                      placeholder="type candidate name"
                      required
                      onChange={handleChange}
                      value={form.username}
                    />

                    {dropdown === true && (
                      <div className="absolute mt-10 bg-white w-70 border border-slate-400 py-2 rounded-md">
                        {search.length > 0 && (
                          <div className="mx-2">
                            {search.map((candidate) => (
                              <p
                                key={candidate._id}
                                className="border-t py-1 px-2 border-slate-400 cursor-pointer"
                                onClick={() => handleNameSubmit(candidate)}
                              >
                                {candidate.username}
                              </p>
                            ))}
                          </div>
                        )}
                      </div>
                    )}
                  </div>
                </div>

                <div className="flex  w-full justify-center">
                  <div className="flex flex-col ">
                    <label htmlFor="resume">Upload CV</label>
                    <input
                      type="file"
                      id="resume"
                      name="resume"
                      className="border px-2 py-1 rounded-md w-100"
                      required
                      onChange={(e) =>
                        setFormdata({
                          ...form,
                          resume: e.target.files[0], // keep actual File object
                        })
                      }
                    />
                  </div>
                </div>

                <button className="border text-white py-1 bg-blue-400 w-[20%] border-slate-200 rounded-md  ">
                  Submit
                </button>
              </form>
            </div>
          </div>
        )}
      </Popup>
    </div>
  );
};

export default UploadResume;
