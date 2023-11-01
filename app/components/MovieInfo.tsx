import { IoIosAddCircleOutline } from "react-icons/io";
import { Tooltip } from "react-tooltip";
import { Movie } from "./types";

interface Props {
  movie: Movie;
}

interface Genres {
  [key: number]: string;
}

const genres: Genres = {
  28: "Action",
  12: "Adventure",
  16: "Animation",
  35: "Comedy",
  80: "Crime",
  99: "Documentary",
  18: "Drama",
  10751: "Family",
  14: "Fantasy",
  27: "Horror",
  9648: "Mystery",
  10749: "Romance",
  878: "Science Fiction",
  53: "Thriller",
  37: "Western",
  10759: "Action & Adventure",
  10762: "Kids",
  10763: "News",
  10764: "Reality",
  10765: "Sci-Fi & Fantasy",
  10766: "Soap",
  10767: "Talk",
  10768: "War & Politics",
};

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

      {/* <div className="text-sm">
        <p>{movie.title}</p>
        <p className=" overflow-scroll">{movie.overview}</p>
      </div> */}
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
