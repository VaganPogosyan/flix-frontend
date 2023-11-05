import { getCookie } from "@/app/utils/cookieFunctions";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

interface Props {
  profile_id: string;
  currentColor: string;
  currentName: string;
  setOpenEditMenu: (arg: boolean) => void;
  //   setPickedColor: (arg: string) => void;
}

export default function EditMenu({
  profile_id,
  currentColor,
  currentName,
  setOpenEditMenu,
}: //   setPickedColor,
Props) {
  const [editedProfile, setEditedProfile] = useState({
    name: currentName,
    color: currentColor,
  });
  //   const [pickedColor, setPickedColor] = useState(currentColor);

  const router = useRouter();
  const colors = ["red", "green", "blue", "orange", "violet"];

  //   useEffect(() => {
  //     console.log("hello");
  //   }, [pickedColor]);

  const handleChange = (event: any) => {
    setEditedProfile({ ...editedProfile, name: event.target.value });
  };

  const handleSubmit = (event: any) => {
    event.preventDefault();

    const accessToken = getCookie("FlixAccessToken");

    const httpOptions: object = {
      method: "POST",
      headers: {
        Authorization: `Bearer ${accessToken}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(editedProfile),
    };

    fetch(
      `http://localhost:8000/api/profile/edit_profile/${profile_id}`,
      httpOptions
    )
      .then((response) => response.json())
      .then((response) => {
        setOpenEditMenu(false);
        router.push("/user/profiles");
      });
  };

  return (
    <div>
      <form
        onSubmit={handleSubmit}
        className="flex flex-col items-center justify-center"
      >
        <div className="relative z-0 w-full ">
          <input
            onChange={handleChange}
            type="text"
            name="name"
            id="name"
            className="py-2.5 px-0 w-full text-sm text-neutral-100 bg-transparent border-0 border-b-2 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-red-500 peer"
            placeholder="Name"
            value={editedProfile.name}
            required
          />
        </div>

        <div className="flex my-6 gap-2">
          {colors.map((color) => (
            <div
              onClick={() => {
                setEditedProfile({ ...editedProfile, color });
                // setPickedColor(color);
              }}
              key={color}
              style={{ backgroundColor: color }}
              className={`w-6 h-6 hover:cursor-pointer hover:border-2`}
            ></div>
          ))}
        </div>

        <button
          type="submit"
          //   onClick={() => setOpenEditMenu(false)}
          className="text-white bg-red-600 hover:bg-red-700 focus:ring-4 focus:outline-none focus:ring-red-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center"
        >
          Save
        </button>
      </form>
    </div>
  );
}
