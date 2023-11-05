import { useEffect, useState } from "react";
import AllMovies from "./components/AllMovies";
import { getCookie } from "./utils/cookieFunctions";
import { useRouter } from "next/navigation";

export default function Home() {
  // const [loggedIn, setLoggedIn] = useState(false);
  // const router = useRouter();

  // useEffect(() => {
  //   const cookie = getCookie("FlixAccessToken");
  //   console.log(cookie);

  //   if (cookie === "none") {
  //     setLoggedIn(false);
  //     router.push("/user/login");
  //   } else {
  //     // setLoggedIn(true);
  //   }
  // }, [router]);

  return (
    <div>
      {/* {loggedIn && <AllMovies />} */}
      <AllMovies />
    </div>
  );
}
