"use client";
import Image from "next/image";
import { useEffect, useState } from "react";
import popcorn from "../../public/popcorn.jpg";
import MovieCard from "./MovieCard";
import Spinner from "./Spinner";
import { Movie } from "./types";

const base_url = "http://localhost:8000/api";

interface Props {
  category: string;
  setIsLoading: (isLoading: boolean) => void;
  isLoading: boolean;
  oneVideoPlaying: boolean;
  setOneVideoPlaying: (oneVideoPlaying: boolean) => void;
}

export default function MoviesRow({
  category,
  setIsLoading,
  isLoading,
  oneVideoPlaying,
  setOneVideoPlaying,
}: Props) {
  const [allMovies, setAllMovies] = useState<Movie[]>([])!;

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
      <ul className="mx-16 mb-4">
        <h1 className="text-2xl text-neutral-200">
          {categoryFormattedHeading}
        </h1>
        <div className="flex">
          {allMovies.map((movie: Movie) => (
            <MovieCard
              oneVideoPlaying={oneVideoPlaying}
              setOneVideoPlaying={setOneVideoPlaying}
              key={movie.id}
              movie={movie}
            />
          ))}
        </div>
      </ul>
    )
  );
}
