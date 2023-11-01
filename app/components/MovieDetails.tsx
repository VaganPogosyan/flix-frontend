import { useEffect, useState } from "react";
import MovieClip from "./MovieClip";

interface Props {
  mouseOutEvent: () => void;
  movie_id: number;
  isTV: string | boolean;
}

const base_url = "http://localhost:8000/api";

export default function MovieDetails({ mouseOutEvent, movie_id, isTV }: Props) {
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
    <div
      onMouseLeave={mouseOutEvent}
      className="absolute w-[350px] h-[350px] bg-slate-500 z-[99999999] rounded-md overflow-hidden"
    >
      <MovieClip youtubeKey={youtubeKey} />
    </div>
  );
}
