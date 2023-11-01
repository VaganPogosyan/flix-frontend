import Image from "next/image";
import { useCallback, useEffect, useState } from "react";
import MovieDetails from "./MovieDetails";
import { motion } from "framer-motion";

const variants = {
  hidden: {
    scale: 0.3,
    opacity: 0.9,
  },
  visible: {
    scale: 1,
    opacity: 1,
  },
};

interface Movie {
  adult: boolean;
  backdrop_path: string;
  id: number;
  title: string;
  original_language: string;
  original_title: string;
  overview: string;
  poster_path: string;
  media_type: string;
  genre_ids: number[];
  popularity: number;
  release_date: string;
  video: boolean;
  vote_average: number;
  vote_count: number;
  first_air_date?: string;
}

interface Props {
  movie: Movie;
  oneVideoPlaying: boolean;
  setOneVideoPlaying: (oneVideoPlaying: boolean) => void;
}

export default function MovieCard({
  movie,
  oneVideoPlaying,
  setOneVideoPlaying,
}: Props) {
  const [showMovieDetails, setShowMovieDetails] = useState(false);
  const [isHovering, setIsHovering] = useState(false);
  // const [oneIsShowing, setOneIsShowing] = useState(false);

  // only one MovieDetials component could be rendered
  // check if there's MovieDetails cmoponent rendered
  // if you start rendering another
  // close the previous one

  useEffect(() => {
    let timeoutId: ReturnType<typeof setTimeout>;

    if (isHovering) {
      timeoutId = setTimeout(() => {
        setShowMovieDetails(true);
      }, 500);
    }

    return () => {
      clearTimeout(timeoutId);
    };
  }, [isHovering]);

  const mouseOutEvent = useCallback(() => setShowMovieDetails(false), []);

  return (
    <li
      key={movie.id}
      className="relative min-w-fit m-2 hover:cursor-pointer flex justify-center items-center"
      onMouseOver={() => {
        setIsHovering(true);
      }}
      onMouseOut={() => setIsHovering(false)}
    >
      {showMovieDetails && (
        <motion.div
          className="absolute w-[350px] h-[350px] z-[999] rounded-xl overflow-hidden shadow-[0px_0px_30px_black]"
          variants={variants}
          initial="hidden"
          animate="visible"
          exit="hidden"
        >
          <MovieDetails
            mouseOutEvent={mouseOutEvent}
            movie_id={movie.id}
            isTV={movie.media_type !== "movie" && !!movie.first_air_date}
          />
        </motion.div>
      )}

      <div className="rounded-md overflow-hidden">
        <Image
          width={170}
          height={170}
          loader={() =>
            movie.poster_path
              ? `https://image.tmdb.org/t/p/w300${movie.poster_path}`
              : "https://media.istockphoto.com/id/1147544807/vector/thumbnail-image-vector-graphic.jpg?s=612x612&w=0&k=20&c=rnCKVbdxqkjlcs3xH87-9gocETqpspHFXu5dIGB4wuM="
          }
          src={`https://image.tmdb.org/t/p/original${movie.poster_path}`}
          alt=""
        />
      </div>
    </li>
  );
}
