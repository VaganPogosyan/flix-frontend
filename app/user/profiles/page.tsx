"use client";
import { useEffect, useState } from "react";
import { Profile } from "@/app/components/types";
import { getCookie } from "@/app/utils/cookieFunctions";

export default function AllProfiles() {
  const [profiles, setProfiles] = useState([]);

  useEffect(() => {
    const accessToken = getCookie("FlixAccessToken");
    console.log(accessToken);

    const httpOptions: object = {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    };

    fetch("http://localhost:8000/api/profile", httpOptions)
      .then((response) => response.json())
      .then((response) => {
        setProfiles(response.data);
      });
  }, []);

  return (
    <div className="w-screen h-screen flex items-center justify-center">
      <div className="w-fit flex flex-col justify-center items-center">
        <h1 className="text-5xl mb-20">{"Who's watching?"}</h1>

        <div className="flex items-center gap-10">
          {profiles &&
            profiles.map((profile: Profile) => (
              <div key={profile._id}>
                <div
                  style={{
                    background: `linear-gradient(180deg, ${profile.color}, dark${profile.color} )`,
                  }}
                  className="h-[200px] w-[200px] flex items-center justify-center rounded-md hover:border-4 hover:cursor-pointer"
                >
                  <h1 className="text-3xl drop-shadow-[#000_0px_0px_1px]">
                    {profile.name}
                  </h1>
                </div>
              </div>
            ))}
          {profiles.length < 3 && (
            <div
              style={{
                background: `linear-gradient(180deg, #555, #333)`,
              }}
              className="h-[200px] w-[200px] flex items-center justify-center rounded-md hover:border-4 hover:cursor-pointer"
            >
              <h1 className="text-3xl drop-shadow-[#000_0px_0px_1px]">
                + Add Profile
              </h1>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
