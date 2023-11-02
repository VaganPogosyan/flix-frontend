"use client";

import { useEffect, useState } from "react";
import MovieCard from "./MovieCard";
import { Movie } from "./types";
// import { motion } from "framer-motion";

const base_url = "http://localhost:8000/api";

const variants = {
  left: {
    x: "-500px",
  },
  right: {
    x: "0px",
  },
};

interface Props {
  category: string;
  setIsLoading: (isLoading: boolean) => void;
  isLoading: boolean;
}

export default function MoviesRow({
  category,
  setIsLoading,
  isLoading,
}: Props) {
  const [allMovies, setAllMovies] = useState<Movie[]>([])!;
  const [moveToSide, setMoveToSide] = useState("");

  const categoryFormattedHeading = category
    .replace("movies", "Movies")
    .replaceAll("_", " ")
    .replace("tvshows", "TV Shows")
    .split(" ")
    .map((word) => word.charAt(0).toUpperCase() + word.substring(1))
    .join(" ");

  useEffect(() => {
    setIsLoading(true);

    fetch(`${base_url}/movies/${category}`, {
      //   headers: {
      //     Authorization: `Bearer ${process.env.TEMP_ACCESS_TOKEN}`,
      //   },
    })
      .then((response) => response.json())
      .then((data) => {
        console.log(data.data);
        setAllMovies(data.data);
        setIsLoading(false);
      });
  }, [category, setAllMovies, setIsLoading]);

  return (
    !isLoading && (
      <ul className="mx-16">
        <h1 className="relative text-3xl text-neutral-200 top-8">
          {categoryFormattedHeading}
        </h1>

        {/* <button className="p-6 border" onClick={() => setMoveToSide("left")}>
          Move Left
        </button>
        <button className="p-6 border" onClick={() => setMoveToSide("right")}>
          Move Right
        </button> */}

        {/* <motion.div variants={variants} animate={moveToSide} className="flex"> */}
        <div className="flex overflow-auto py-10 no-scrollbar">
          {allMovies.map((movie: Movie) => (
            <MovieCard key={movie.id} movie={movie} />
          ))}
        </div>

        {/* </motion.div> */}
      </ul>
    )
  );
}
