"use client";
import { useEffect, useState } from "react";
import { Profile } from "@/app/components/types";
import { getCookie } from "@/app/utils/cookieFunctions";
import { useRouter } from "next/navigation";

export default function AllProfiles() {
  const [nameObject, setNameObject] = useState({ name: "" });
  const router = useRouter();

  const handleSubmit = (event: any) => {
    event.preventDefault();

    const accessToken = getCookie("FlixAccessToken");
    const httpOptions: object = {
      method: "POST",
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
      body: JSON.stringify(nameObject),
    };

    console.log(JSON.stringify(httpOptions));

    fetch("http://localhost:8000/api/profile/create_profile", httpOptions)
      .then((response) => response.json())
      .then((response) => {
        console.log(response);
        router.replace("/user/profiles");
      });
  };

  const handleChange = (event: any) => {
    setNameObject({ name: event.target.value });
  };

  return (
    <div className="w-screen h-screen flex flex-col items-center justify-center">
      <h1 className="text-4xl mb-20">New Profile</h1>
      <form onSubmit={handleSubmit} className="z-50 w-[200px]">
        <div className="relative z-0 w-full mb-6 group">
          <input
            onChange={handleChange}
            type="text"
            name="name"
            id="name"
            className="block py-2.5 px-0 w-full text-md  text-neutral-100 bg-transparent border-0 border-b-2 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-red-500 peer"
            placeholder=" "
            required
          />
          <label
            htmlFor="name"
            className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-red-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
          >
            Name
          </label>
        </div>
        <button
          type="submit"
          className="text-white bg-red-600 hover:bg-green-600 focus:ring-4 focus:outline-none focus:ring-white font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center"
        >
          Add Profile
        </button>
      </form>
    </div>
  );
}
