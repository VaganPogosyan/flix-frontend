import {
  IoIosAddCircleOutline,
  IoIosCheckmarkCircleOutline,
} from "react-icons/io";
import { Tooltip } from "react-tooltip";
import { Movie } from "./types";
import { genres } from "./types";
import { getCookie } from "../utils/cookieFunctions";
import { useState } from "react";

interface Props {
  movie: Movie;
}

const base_url = "https://flix-backend-api-6e1845c4fce4.herokuapp.com/api";

export default function MovieInfo({ movie }: Props) {
  const [addedToWatchlist, setAddedToWatchlist] = useState(false);

  const handleClick = (movie: Movie) => {
    console.log(movie);
    // http to send to watchlist
    const accessToken = getCookie("FlixAccessToken");
    const profileId = getCookie("FlixProfileId");

    const httpOptions: object = {
      method: "POST",
      headers: {
        Authorization: `Bearer ${accessToken}`,
        "Content-type": "application/json",
      },
    };

    fetch(
      `${base_url}/profile/add_to_watchlist/${profileId}/${movie.id}`,
      httpOptions
    )
      .then((response) => response.json())
      .then((response) => {
        if (response.status === "success") setAddedToWatchlist(true);
      });
  };

  const genreIdsLength = movie.genre_ids.length;

  return (
    <div className="px-4 text-neutral-300">
      <div className="flex flex-row justify-between items-center pt-2">
        <h2 className="w-[85%] text-xl">{movie.title || movie.name}</h2>
        {addedToWatchlist ? (
          <IoIosCheckmarkCircleOutline
            onClick={() => handleClick(movie)}
            className="text-5xl text-neutral-400 hover:text-neutral-200 w-fit"
            data-tooltip-id="my-tooltip"
            data-tooltip-content="Added To Watchlist"
          />
        ) : (
          <IoIosAddCircleOutline
            onClick={() => handleClick(movie)}
            className="text-5xl text-neutral-400 hover:text-neutral-200 w-fit"
            data-tooltip-id="my-tooltip"
            data-tooltip-content="Add To Watchlist"
          />
        )}
      </div>
      <Tooltip
        opacity={1}
        style={{ backgroundColor: "white", color: "black", fontSize: "1rem" }}
        id="my-tooltip"
      />

      <div className="flex flex-row flex-wrap text-sm mt-4">
        {movie.genre_ids.map((genreId, idx) =>
          genres[genreId] ? (
            <p key={genreId}>
              {genres[genreId]}
              {idx !== genreIdsLength - 1 && (
                <span className="mx-2 text-green-600">•</span>
              )}
            </p>
          ) : (
            ""
          )
        )}
      </div>
    </div>
  );
}

// adult: boolean;
// backdrop_path: string;
// id: number;
// title: string;
// original_language: string;
// original_title: string;
// overview: string;
// poster_path: string;
// media_type: string;
// genre_ids: number[];
// popularity: number;
// release_date: string;
// video: boolean;
// vote_average: number;
// vote_count: number;
// first_air_date?: string;
