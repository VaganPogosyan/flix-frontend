import Image from "next/image";
import { useCallback, useEffect, useState } from "react";
import MovieDetails from "./MovieDetails";
import { motion } from "framer-motion";
import { Movie } from "./types";

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

interface Props {
  movie: Movie;
  scrolled: boolean;
  setScrolled: (scrolled: boolean) => void;
}

export default function MovieCard({ movie, scrolled, setScrolled }: Props) {
  const [showMovieDetails, setShowMovieDetails] = useState(false);
  const [isHovering, setIsHovering] = useState(false);
  const [position, setPosition] = useState("");

  useEffect(() => {
    setScrolled(false);
    let movieCard = document.getElementById(`movie-card-${movie.id}`)!;
    let rect = movieCard.getBoundingClientRect();

    const distToRightEdge = window.innerWidth - rect.right;
    // console.log(movie.name || movie.title, " ", distToRightEdge.toString());

    if (rect.left < 153) {
      setPosition("start");
      return;
    } else if (distToRightEdge < 153 && distToRightEdge > -153) {
      setPosition("end");
      return;
    } else {
      setPosition("center");
      return;
    }
  }, [scrolled]);

  useEffect(() => {
    let timeoutId: ReturnType<typeof setTimeout>;

    if (isHovering) {
      timeoutId = setTimeout(() => {
        setShowMovieDetails(true);
      }, 400);
    }

    return () => {
      clearTimeout(timeoutId);
    };
  }, [isHovering]);

  const mouseOutEvent = useCallback(() => setShowMovieDetails(false), []);

  return (
    <li
      id={`movie-card-${movie.id}`}
      key={movie.id}
      className={`relative min-w-fit m-2 hover:cursor-pointer flex justify-${position} items-center`}
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
            movie={movie}
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
              ? `https://image.tmdb.org/t/p/w300/${movie.poster_path}`
              : "https://media.istockphoto.com/id/1147544807/vector/thumbnail-image-vector-graphic.jpg?s=612x612&w=0&k=20&c=rnCKVbdxqkjlcs3xH87-9gocETqpspHFXu5dIGB4wuM="
          }
          src={`https://image.tmdb.org/t/p//w300/${movie.poster_path}`}
          alt=""
        />
      </div>
    </li>
  );
}
