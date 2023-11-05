"use client";
// import backImage from "@/public/back.jpg";
// import Image from "next/image";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { setCookie } from "@/app/utils/cookieFunctions";

export default function User() {
  const router = useRouter();

  const [formData, setFormData] = useState({
    email: "",
    password: "",
    confirm_password: "",
  });

  const handleChange = (event: any) => {
    setFormData({
      ...formData,
      [event.target.name]: event.target.value,
    });
  };

  const handleSubmit = (event: any) => {
    event.preventDefault();

    fetch("http://localhost:8000/api/user/login", {
      method: "POST",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify(formData),
    })
      .then((response) => response.json())
      .then((response) => {
        if (response.status === "failed") {
          toast.error(response.error, {
            position: "top-center",
            autoClose: 3000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "colored",
          });
        }
        if (response.status === "success") {
          //   set accessToken in a cookie to get it for profiles page route
          setCookie("FlixAccessToken", response.accessToken);
          router.replace("/user/profiles");
        }
      });
  };

  return (
    <div className="w-screen h-screen flex items-center justify-center">
      <ToastContainer
        className="mt-[60px]"
        position="top-center"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="colored"
      />

      <form onSubmit={handleSubmit} className="z-50 w-1/3">
        <h1 className="mb-8 text-2xl text-neutral-300">Log In</h1>
        <div className="relative z-0 w-full mb-6 group">
          <input
            onChange={handleChange}
            type="email"
            name="email"
            id="email"
            className="block py-2.5 px-0 w-full text-sm  text-neutral-100 bg-transparent border-0 border-b-2 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-red-500 peer"
            placeholder=" "
            required
          />
          <label
            htmlFor="email"
            className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-red-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
          >
            Email address
          </label>
        </div>
        <div className="relative z-0 w-full mb-6 group">
          <input
            onChange={handleChange}
            type="password"
            name="password"
            id="password"
            className="block py-2.5 px-0 w-full text-sm text-neutral-100 bg-transparent border-0 border-b-2 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-red-500 peer"
            placeholder=" "
            required
          />
          <label
            htmlFor="password"
            className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-red-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
          >
            Password
          </label>
        </div>
        <div className="grid md:grid-cols-2 md:gap-6"></div>
        <div className="flex items-center gap-10">
          <button
            type="submit"
            className="text-white bg-red-600 hover:bg-red-700 focus:ring-4 focus:outline-none focus:ring-red-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center"
          >
            Login
          </button>
          <div className="text-sm">
            {"Don't have an account?"}
            <span
              onClick={() => router.push("/user/register")}
              className="ml-2 hover:text-red-500 hover:cursor-pointer underline"
            >
              Register
            </span>
          </div>
        </div>
      </form>
      {/* <Image
        src={backImage}
        alt="image"
        className="fixed w-screen min-w-[1500px] opacity-10 z-0 "
      /> */}
    </div>
  );
}
