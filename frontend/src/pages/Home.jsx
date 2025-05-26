import React from "react";
import { useNavigate } from "react-router-dom";
const Home = () => {
  const navigate = useNavigate();
  const handleClick = (role) => {
    if(role === "Candidate") {
      navigate("/signup");
    }else{
      // navigate("/admin");
    }
  };
  return (
    <div className=" h-screen flex flex-col items-center justify-center">
      <div className="bg-slate-200 p-8 rounded shadow-md text-center flex flex-col items-center w-[50%]">
        <p className="font-bold text-3xl pb-10">Login Or Signup as Candidate or Admin</p>
      <button onClick={() => handleClick("Candidate")} className="bg-slate-500 text-white py-2 px-4 rounded">Candidate</button><br />
      <button onClick={() => handleClick("Admin")} className="bg-slate-500 text-white py-2 px-4 rounded">Admin</button>
      </div>
    </div>
  );
};

export default Home;
