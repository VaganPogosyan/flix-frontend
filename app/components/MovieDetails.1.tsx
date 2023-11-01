import { useEffect, useState } from "react";
import MovieClip from "./MovieClip";
import { Props, base_url } from "./MovieDetails";

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
      // onMouseLeave={mouseOutEvent}
      className="absolute w-[350px] h-[350px] bg-slate-500  rounded-md overflow-hidden"
    >
      <div className="z-[99999]">
        <MovieClip youtubeKey={youtubeKey} />
      </div>
      <div
        // onMouseEnter={mouseOutEvent}
        id="backdrop"
        className="fixed inset-0 bg-emerald-600 bg-opacity-50 z-[9999999]"
      ></div>
      {/* </motion.div> */}
    </div>
  );
}
