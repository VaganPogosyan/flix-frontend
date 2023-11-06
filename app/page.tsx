"use client";
import { useEffect, useState } from "react";
import AllMovies from "./components/AllMovies";
import { getCookie } from "./utils/cookieFunctions";
import { useRouter } from "next/navigation";

export default function Home() {
  // const [loggedIn, setLoggedIn] = useState(false);
  const router = useRouter();

  useEffect(() => {
    if (
      getCookie("FlixAccessToken") === "none" ||
      !getCookie("FlixAccessToken")
    ) {
      router.replace("/user/register");
    }
  }, [router]);

  return (
    <div>
      {/* {loggedIn && <AllMovies />} */}
      <AllMovies />
    </div>
  );
}
