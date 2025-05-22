import React from "react";
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";
const EditCandidate = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const [form, setform] = useState({
    Name: "",
    EmailId: "",
    image: "",
    Status: "",
    AiRating: "",
    AppliedOn: "",
    Tag: "",
    CvUrl: "",
  });

  useEffect(() => {
    let handleData = async () => {
      try {
        let data = await fetch(`http://localhost:3000/candidates/${id}`);
        let result = await data.json();
        if (result != null) {
          console.log(result);
          setform({
            Name: result.Name,
            EmailId: result.EmailId,
            image: result.image,
            Status: result.Status,
            AiRating: result.AiRating,
            AppliedOn: result.AppliedOn.split("T")[0],
            Tag: result.Tag,
            CvUrl: result.CvUrl,
          });
        }
      } catch (error) {
        console.log(error);
      }
    };
    handleData();
  }, []);

  let handleChange = (e) => {
    setform({
      ...form,
      [e.target.name]: e.target.value,
    });
  };
  let handleSubmit = async (e) => {
    e.preventDefault();
    try {
      let data = await fetch(`http://localhost:3000/candidates/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(form),
      });
      let result = await data.json();
      if (result) {
        alert("Candidate updated successfully");
        setTimeout(() => {
          navigate("/");
        }, 100);
      }
    } catch (error) {
      console.log("Error in adding candidate:", error);
    }
  };

  return (
    <>
      <div className="mt-10 flex flex-col items-center">
        <h1 className="text-center font-bold text-3xl">Add A New Candidate</h1>
        <form
          className="h-full w-[60%] mt-5 flex flex-col gap-3 border p-8"
          onSubmit={handleSubmit}
        >
          {/* name */}
          <div className="flex flex-col">
            <label htmlFor="name">Name</label>
            <input
              type="text"
              id="name"
              name="Name"
              className="border px-2 py-1 rounded-md"
              onChange={handleChange}
              value={form.Name}
              required
            />
          </div>
          {/* email */}
          <div className="flex flex-col">
            <label htmlFor="email">Email</label>
            <input
              type="email"
              id="email"
              name="EmailId"
              className="border px-2 py-1 rounded-md"
              onChange={handleChange}
              value={form.EmailId}
              required
            />
          </div>
          {/* image url */}
          <div className="flex flex-col">
            <label htmlFor="image">Image Url</label>
            <input
              type="text"
              id="image"
              name="image"
              className="border px-2 py-1 rounded-md"
              onChange={handleChange}
              value={form.image}
              required
            />
          </div>
          {/* ai rating */}
          <div className="flex flex-col">
            <label htmlFor="ai_rating">AI Rating</label>
            <input
              type="Number"
              id="ai_rating"
              name="AiRating"
              className="border px-2 py-1 rounded-md"
              onChange={handleChange}
              min={1}
              max={100}
              value={form.AiRating}
              required
            />
          </div>
          {/* appied on */}
          <div className="flex flex-col">
            <label htmlFor="applied_on">Applied On</label>
            <input
              type="date"
              id="applied_on"
              name="AppliedOn"
              className="border px-2 py-1 rounded-md"
              onChange={handleChange}
              value={form.AppliedOn}
              required
            />
          </div>
          {/* cv url */}
          <div className="flex flex-col">
            <label htmlFor="cv_url">CV Url</label>
            <input
              type="text"
              id="cv_url"
              name="CvUrl"
              className="border px-2 py-1 rounded-md"
              onChange={handleChange}
              value={form.CvUrl}
              required
            />
          </div>
          {/* status */}
          <div className="flex flex-col">
            <label htmlFor="status">Status</label>
            <select
              name="Status"
              id="status"
              className="border px-2 py-1 rounded-md"
              onChange={handleChange}
              value={form.Status}
              required
            >
              <option value="">Select Status</option>
              <option value="New">New</option>
              <option value="Opended">Opended</option>
            </select>
          </div>
          {/* tag */}
          <div className="flex flex-col">
            <label htmlFor="tag">Tag</label>
            <select
              name="Tag"
              id="tag"
              className="border px-2 py-1 rounded-md"
              onChange={handleChange}
              value={form.Tag}
              required
            >
              <option value="">Select Tag</option>
              <option value="No Tag">No Tag</option>
              <option value="Potencial Fit">Potencial Fit</option>
              <option value="Average Portfolio">Average Portfolio</option>
              <option value="Strong Portfolio">Strong Portfolio</option>
            </select>
          </div>

          <button className="border bg-slate-400 w-[20%]">Submit</button>
        </form>
      </div>
    </>
  );
};

export default EditCandidate;
