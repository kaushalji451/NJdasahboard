import React from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { formValidationSchema } from "../types/formValidationSchema";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const Home = () => {
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    watch,
    setValue,
  } = useForm({
    resolver: zodResolver(formValidationSchema),
    mode: "onChange",
  });

  const onSubmit = async (data) => {
    const fd = new FormData();
    for (let key in data) {
      fd.append(key, data[key]);
    }
    console.log("form data:",fd.get("username"))
    console.log(data)

    try {
      const res = await axios.post(`${import.meta.env.VITE_API_URL}/auth/signup`, fd);

      if (res.data) {
        localStorage.setItem("UserInfo", JSON.stringify(res.data.userSaved));
        alert("Registration successful!");
        navigate("/login");
      } else {
        alert("Failed: " + data.message);
      }
    } catch (err) {
      console.error("Error submitting form:", err);
    }
  };

  const sopValue = watch("sop") || "";

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="max-w-xl mx-auto p-8 bg-white rounded-lg shadow-md space-y-6"
    >
      <h2 className="text-2xl font-semibold text-center mb-6">
        Application Form
      </h2>

      <div>
        <input
          {...register("name")}
          placeholder="Name"
          className="w-full border border-gray-300 rounded-md p-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        {errors.name && (
          <p className="mt-1 text-sm text-red-600">{errors.name.message}</p>
        )}
      </div>
      <div>
        <input
          placeholder="Username"
          type="text"
          {...register("username")}
          className="w-full border border-gray-300 rounded-md p-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        {errors.username && (
          <p className="mt-1 text-sm text-red-600">{errors.username.message}</p>
        )}
      </div>

      <div>
        <input
          {...register("email")}
          placeholder="Email"
          className="w-full border border-gray-300 rounded-md p-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        {errors.email && (
          <p className="mt-1 text-sm text-red-600">{errors.email.message}</p>
        )}
      </div>

      <div>
        <input
          {...register("phoneno")}
          placeholder="Phone No"
          className="w-full border border-gray-300 rounded-md p-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        {errors.phoneno && (
          <p className="mt-1 text-sm text-red-600">{errors.phoneno.message}</p>
        )}
      </div>

      <div>
        <input
          {...register("dob")}
          type="date"
          className="w-full border border-gray-300 rounded-md p-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        {errors.dob && (
          <p className="mt-1 text-sm text-red-600">{errors.dob.message}</p>
        )}
      </div>

      <div>
        <select
          {...register("gender")}
          className="w-full border border-gray-300 rounded-md p-3 bg-white focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          <option value="">Select Gender</option>
          <option value="male">Male</option>
          <option value="female">Female</option>
          <option value="other">Other</option>
        </select>
        {errors.gender && (
          <p className="mt-1 text-sm text-red-600">{errors.gender.message}</p>
        )}
      </div>

      <div>
        <input
          {...register("degree")}
          placeholder="Degree"
          className="w-full border border-gray-300 rounded-md p-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        {errors.degree && (
          <p className="mt-1 text-sm text-red-600">{errors.degree.message}</p>
        )}
      </div>

      <div>
        <select
          {...register("department")}
          className="w-full border border-gray-300 rounded-md p-3 bg-white focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          <option value="">Select Department</option>
          <option value="technical_role">Technical</option>
          <option value="business_role">Business</option>
        </select>
        {errors.department && (
          <p className="mt-1 text-sm text-red-600">
            {errors.department.message}
          </p>
        )}
      </div>

      <div>
        <textarea
          {...register("sop")}
          placeholder="Statement of Purpose"
          className="w-full border border-gray-300 rounded-md p-3 resize-none focus:outline-none focus:ring-2 focus:ring-blue-500"
          rows={5}
        />
        <p className="text-sm text-gray-500 mt-1">
          Characters: {sopValue.length}
        </p>
        {errors.sop && (
          <p className="mt-1 text-sm text-red-600">{errors.sop.message}</p>
        )}
      </div>

      <div>
        <input
          type="file"
          onChange={(e) => setValue("file", e.target.files[0])}
          className="w-full p-3 border border-gray-300 rounded-md cursor-pointer focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        {errors.file && (
          <p className="mt-1 text-sm text-red-600">{errors.file.message}</p>
        )}
      </div>
      <div>
        <input
          type="password"
          {...register("password")}
          className="w-full border border-gray-300 rounded-md p-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
          placeholder="Password"
        />
        {errors.password && (
          <p className="mt-1 text-sm text-red-600">{errors.password.message}</p>
        )}
      </div>

      <button
        type="submit"
        disabled={isSubmitting}
        className="w-full bg-blue-600 hover:bg-blue-700 disabled:bg-blue-300 text-white font-semibold py-3 rounded-md transition-colors"
      >
        {isSubmitting ? "Submitting..." : "Submit"}
      </button>
    </form>
  );
};

export default Home;
