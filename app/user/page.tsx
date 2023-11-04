"use client";
import backImage from "@/public/back.jpg";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function User() {
  // const router = useRouter();
  // const [formData, setFormData] = useState({
  //   email: "",
  //   password: "",
  //   confirm_password: "",
  // });

  // const handleChange = (event: any) => {
  //   setFormData({
  //     ...formData,
  //     [event.target.name]: event.target.value,
  //   });
  // };

  // const handleSubmit = (event: any) => {
  //   event.preventDefault();

  //   fetch("http://localhost:8000/api/user/register", {
  //     method: "POST",
  //     headers: {
  //       "Content-type": "application/json",
  //     },
  //     body: JSON.stringify(formData),
  //   })
  //     .then((response) => response.json())
  //     .then((response) => {
  //       if (response.status === "success") {
  //         router.replace("/");
  //         // console.log(response.status);
  //       }
  //     });
  // };

  return (
    <div className="w-screen h-screen flex items-center justify-center">
      <h1>Profiles here</h1>
    </div>
  );
}
