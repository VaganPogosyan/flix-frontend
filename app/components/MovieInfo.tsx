import { IoIosAddCircleOutline } from "react-icons/io";
import { Tooltip } from "react-tooltip";
import { Movie } from "./types";
import { genres } from "./types";

interface Props {
  movie: Movie;
}

export default function MovieInfo({ movie }: Props) {
  const genreIdsLength = movie.genre_ids.length;
  return (
    <div className="px-4 text-neutral-300">
      <div className="flex flex-row justify-between items-center pt-2">
        <h2 className="w-[85%] text-xl">{movie.title || movie.name}</h2>
        <IoIosAddCircleOutline
          onClick={() => console.log("clicked")}
          className="text-5xl text-neutral-400 hover:text-neutral-200 w-fit"
          data-tooltip-id="my-tooltip"
          data-tooltip-content="Add To Watchlist"
        />
      </div>
      <Tooltip
        opacity={1}
        style={{ backgroundColor: "white", color: "black", fontSize: "1rem" }}
        id="my-tooltip"
      />

      <div className="flex flex-row flex-wrap text-sm mt-4">
        {movie.genre_ids.map((genreId, idx) => (
          <p key={genreId}>
            {genres[genreId]}
            {idx !== genreIdsLength - 1 && (
              <span className="mx-2 text-green-600">•</span>
            )}
          </p>
        ))}
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
