import { IoIosAddCircleOutline } from "react-icons/io";
import { Tooltip } from "react-tooltip";

export default function MovieInfo() {
  return (
    <>
      <IoIosAddCircleOutline
        onClick={() => console.log("clicked")}
        className="text-5xl text-neutral-400 hover:text-neutral-200 w-fit"
        data-tooltip-id="my-tooltip"
        data-tooltip-content="Add To Watchlist"
      />

      <Tooltip
        opacity={1}
        style={{ backgroundColor: "white", color: "black", fontSize: "1rem" }}
        id="my-tooltip"
      />
    </>
  );
}
