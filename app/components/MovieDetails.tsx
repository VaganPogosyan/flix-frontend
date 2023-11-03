import { useEffect, useState } from "react";
import MovieClip from "./MovieClip";
import MovieInfo from "./MovieInfo";
import { Movie } from "./types";

interface Props {
  mouseOutEvent: () => void;
  movie_id: number;
  isTV: string | boolean;
  movie: Movie;
}

const base_url = "http://localhost:8000/api";

export default function MovieDetails({
  mouseOutEvent,
  movie,
  movie_id,
  isTV,
}: Props) {
  const [youtubeKey, setYoutubeKey] = useState("");

  const movie_or_tv = isTV ? "tv" : "movie";

  useEffect(() => {
    fetch(`${base_url}/movies/${movie_or_tv}/videos/${movie_id}`)
      .then((response) => response.json())
      .then((videoKey) => {
        setYoutubeKey(videoKey.data);
      })
      .catch((error) => console.error(error));
  }, [movie_id, movie_or_tv]);

  return (
    <div>
      <div className="absolute w-[350px] h-[350px] z-[999999] bg-neutral-900 rounded-md overflow-hidden">
        <MovieClip youtubeKey={youtubeKey} bigMovie={false} />
        <MovieInfo movie={movie} />
      </div>

      <div
        onMouseEnter={mouseOutEvent}
        id="backdrop"
        className="fixed inset-0 bg-opacity-50 z-[999]"
      ></div>
    </div>
  );
}
