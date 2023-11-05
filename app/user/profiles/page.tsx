"use client";
import { useEffect, useState } from "react";
import { Profile } from "@/app/components/types";
import { getCookie, setCookie } from "@/app/utils/cookieFunctions";
import { useRouter } from "next/navigation";
import { BiEditAlt } from "react-icons/bi";
import EditMenu from "./components/EditMenu";

export default function AllProfiles() {
  const [profiles, setProfiles] = useState([]);
  const [openEditMenu, setOpenEditMenu] = useState(false);
  const [loggedIn, setLoggedIn] = useState(false);
  const [chosenProfile, setChosenProfile] = useState("");

  const router = useRouter();

  const chooseProfile = (profile_id: string) => {
    setCookie("FlixProfileId", profile_id);
    setChosenProfile(profile_id);
    router.push("/");
  };

  useEffect(() => {
    const accessToken = getCookie("FlixAccessToken");

    if (accessToken === "none") {
      // setLoggedIn(false);
      router.push("/user/register");
    }

    const httpOptions: object = {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    };

    fetch("http://localhost:8000/api/profile", httpOptions)
      .then((response) => response.json())
      .then((response) => {
        setProfiles(response.data);
        setLoggedIn(true);
      });
  }, [openEditMenu]);

  return (
    <div className="w-screen h-screen flex items-center justify-center">
      {loggedIn && (
        <div className="flex flex-col w-full justify-center items-center">
          <h1 className="text-5xl mb-20">{"Who's watching?"}</h1>

          <div className="flex items-center gap-10">
            {profiles &&
              profiles.map((profile: Profile) => (
                <div key={profile._id}>
                  <div
                    onClick={() => chooseProfile(profile._id)}
                    style={{
                      background: `linear-gradient(180deg, ${profile.color}, dark${profile.color} )`,
                    }}
                    className="h-[200px] w-[200px] flex items-center justify-center rounded-md hover:border-4 hover:cursor-pointer"
                  >
                    <h1 className="text-3xl mx-2 overflow-hidden text-white drop-shadow-[#000_0px_0px_1px]">
                      {profile.name}
                    </h1>
                  </div>

                  {openEditMenu && (
                    <EditMenu
                      currentColor={profile.color}
                      currentName={profile.name}
                      profile_id={profile._id}
                      setOpenEditMenu={setOpenEditMenu}
                    />
                  )}
                </div>
              ))}

            {(!profiles || profiles.length < 3) && (
              <div
                onClick={() => router.push("/user/profiles/add_profile")}
                style={{
                  background: `linear-gradient(180deg, #555, #333)`,
                }}
                className="h-[200px] w-[200px] flex items-center justify-center rounded-md hover:border-4 hover:cursor-pointer"
              >
                <h1 className="text-3xl mx-2 text-neutral-200 drop-shadow-[#000_0px_0px_1px]">
                  + Add Profile
                </h1>
              </div>
            )}
          </div>
          <div
            onClick={() => setOpenEditMenu(!openEditMenu)}
            className="text-3xl hover:cursor-pointer hover:bg-neutral-700 mt-10 rounded-full bg-neutral-800 w-20 h-20 flex items-center justify-center"
          >
            <BiEditAlt />
          </div>
        </div>
      )}
    </div>
  );
}
