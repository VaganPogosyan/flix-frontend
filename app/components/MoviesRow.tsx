"use client";
import Image from "next/image";
import { useEffect, useState } from "react";
import popcorn from "../../public/popcorn.jpg";
import MovieCard from "./MovieCard";
import Spinner from "./Spinner";

const base_url = "http://localhost:8000/api";

interface Props {
  category: string;
  setIsLoading: (isLoading: boolean) => void;
  isLoading: boolean;
}

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
}

export default function MoviesRow({
  category,
  setIsLoading,
  isLoading,
}: Props) {
  const [allMovies, setAllMovies] = useState<Movie[]>([])!;
  // const [isLoading, setIsLoading] = useState<boolean>(true);
  const categoryFormattedHeading = category
    .replace("movies", "")
    .replace("tvshows", "")
    .replaceAll("_", " ")
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
      <ul className=" mx-16">
        <h1>{categoryFormattedHeading}</h1>
        <div className="flex">
          {allMovies.map((movie: Movie) => (
            <MovieCard key={movie.id} movie={movie} />
          ))}
        </div>
      </ul>
    )
  );

  // return true ? (
  //   <ul className=" mx-16">
  //     <div className="flex">
  //       <Spinner />
  //       {/* {allMovies.map((movie: Movie) => (
  //         <MovieCard key={movie.id} movie={movie} />
  //         ))} */}
  //     </div>
  //   </ul>
  // ) : (
  //   <ul className=" mx-16">
  //     <h1>{categoryFormattedHeading}</h1>
  //     <div className="flex">
  //       {allMovies.map((movie: Movie) => (
  //         <MovieCard key={movie.id} movie={movie} />
  //       ))}
  //     </div>
  //   </ul>
  // );
}
