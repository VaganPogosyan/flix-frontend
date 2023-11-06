import { useEffect, useState } from "react";
import { Profile } from "./types";
import { useRouter } from "next/navigation";
import { getCookie, setCookie } from "../utils/cookieFunctions";

const base_url = "https://flix-backend-api-6e1845c4fce4.herokuapp.com/api";

export default function ProfileIcon() {
  const [showModal, setShowModal] = useState(false);
  const [profile, setProfile] = useState<Profile | null>(null);

  const router = useRouter();

  const handleLogout = () => {
    router.push("/user/login");
    setCookie("FlixAccessToken", "none");
    setCookie("FlixProfileId", "none");
  };

  useEffect(() => {
    const accessToken = getCookie("FlixAccessToken");
    const profile_id = getCookie("FlixProfileId");

    if (accessToken !== "none" && profile_id !== "none") {
      const httpOptions: object = {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      };

      fetch(`${base_url}/profile/${profile_id}`, httpOptions)
        .then((response) => response.json())
        .then((response) => {
          setProfile(response.data);
          // router.replace("/");
        });
    }
  }, [profile]);

  return (
    profile && (
      <div className={`${!profile && "pointer-events-none"}`}>
        <div
          onMouseEnter={() => setShowModal(true)}
          onMouseLeave={() => setShowModal(false)}
        >
          <div
            style={{ backgroundColor: profile?.color }}
            className="h-8 w-8 text-sm flex items-center justify-center rounded-sm hover:cursor-pointer"
          >
            {profile?.name.charAt(0)}
          </div>
          {showModal && (
            <div className="fixed  right-20 flex flex-col px-6 py-6 gap-2 bg-neutral-900  backdrop-blur-lg rounded-md">
              <p>
                <span style={{ color: profile?.color }}>• </span>
                {profile?.name}
              </p>

              <button
                onClick={() => router.push("/user/profiles")}
                className="text-white bg-red-600 hover:bg-red-800 py-1 px-6 focus:ring-4 focus:outline-none  font-medium rounded-lg text-sm w-full sm:w-auto  text-center"
              >
                Switch Profile
              </button>

              <button
                onClick={handleLogout}
                className="text-white bg-neutral-600 hover:bg-neutral-700 py-1 px-6 focus:ring-4 focus:outline-none  font-medium rounded-lg text-sm w-full sm:w-auto  text-center"
              >
                Logout
              </button>
            </div>
          )}
        </div>
      </div>
    )
  );
}
