import { useEffect, useState } from "react";

interface Props {
  mouseOutEvent: () => void;
  movie_id: number;
}

const base_url = "http://localhost:8000/api";

export default function MovieDetails({ mouseOutEvent, movie_id }: Props) {
  const [youtubeKey, setYoutubeKey] = useState({});

  useEffect(() => {
    fetch(`${base_url}/movies/movie/videos/${movie_id}`)
      .then((response) => response.json())
      .then((key) => setYoutubeKey(key));
  }, [movie_id]);

  return (
    <div
      onMouseOut={mouseOutEvent}
      className="absolute w-[320px] h-[320px] bg-slate-500 z-[99999999] rounded-md overflow-hidden"
    >
      {/* youtube video here */}
      <h1>{JSON.stringify(youtubeKey)}</h1>
    </div>
  );
}
