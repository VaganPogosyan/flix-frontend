import { useEffect, useState } from "react";
import MovieClip from "./MovieClip";
import { Movie } from "./types";
import Image from "next/image";
import { genres } from "./types";
import { motion, AnimatePresence } from "framer-motion";

import { FaPlay } from "react-icons/fa";

const variants = {
  // hidden: {
  //   opacity: 0,
  //   x: "100vw",
  // },
  // visible: {
  //   opacity: 1,
  //   x: 0,
  //   transition: {
  //     type: "spring",
  //     delay: 0.5,
  //   },
  // },
  exit: {
    opacity: 0,
    transition: {
      ease: "easeInOut",
    },
  },
};

interface Props {
  randomMovie: Movie;
  isTV: boolean;
}
const base_url = "https://flix-backend-api-6e1845c4fce4.herokuapp.com/api";
let imageWidth = 1000;

export default function BigMovie({ randomMovie, isTV }: Props) {
  const [youtubeKey, setYoutubeKey] = useState("");
  const [showVideo, setShowVideo] = useState(false);

  const movie_or_tv = isTV ? "tv" : "movie";
  const genreIdsLength = randomMovie.genre_ids.length;

  useEffect(() => {
    setTimeout(() => {
      setShowVideo(true);
    }, 2000);

    imageWidth = window.innerWidth;

    fetch(`${base_url}/movies/${movie_or_tv}/videos/${randomMovie.id}`)
      .then((response) => response.json())
      .then((videoKey) => {
        setYoutubeKey(videoKey.data);
      })
      .catch((error) => console.error(error));
  }, [movie_or_tv, randomMovie.id]);

  //   <div
  //   className={`relative ${showVideo && "opacity-0"} duration-1000 ${
  //     hideImage && "hidden"
  //   }`}
  // >

  return (
    <div className="min-w-full max-h-fit h-[760px]">
      {/* {!showVideo ? ( */}
      {/* <AnimatePresence> */}
      {!showVideo ? (
        <motion.div variants={variants} exit="exit" className="">
          <div className="absolute w-full h-full bg-gradient-to-r from-neutral-950 from-0% to-transparent to-90%"></div>
          <div className="absolute w-1/2 top-[200px] text-neutral-100 drop-shadow-md pl-20">
            <h2 className="text-7xl">
              {randomMovie.title || randomMovie.name}
            </h2>
            <div className="flex flex-row flex-wrap text-sm mt-6">
              {randomMovie.genre_ids.map((genreId, idx) => (
                <p key={genreId}>
                  {genres[genreId]}
                  {idx !== genreIdsLength - 1 && (
                    <span className="mx-2 text-green-600">•</span>
                  )}
                </p>
              ))}
            </div>
            <p className="mt-6 text-neutral-300 text-lg w-3/4">
              {randomMovie.overview}
            </p>
            <button
              onClick={() => setShowVideo(true)}
              className="mt-6 flex items-center gap-2 rounded-md bg-neutral-100 hover:bg-opacity-80 text-neutral-950 px-10 py-3 text-2xl"
            >
              <FaPlay />
              Play
            </button>
          </div>
          <Image
            width={imageWidth}
            height={700}
            loader={() =>
              `https://image.tmdb.org/t/p/original/${randomMovie.backdrop_path}`
            }
            src={`https://image.tmdb.org/t/p/original/${randomMovie.poster_path}`}
            alt=""
          />
        </motion.div>
      ) : (
        <div className="pt-[60px]">
          <MovieClip
            youtubeKey={youtubeKey}
            bigMovie={true}
            clipWidth={imageWidth}
          />
        </div>
      )}
      {/* </AnimatePresence> */}
    </div>
  );
}
