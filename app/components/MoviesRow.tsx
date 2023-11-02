"use client";

import { useEffect, useRef, useState } from "react";
import MovieCard from "./MovieCard";
import { Movie } from "./types";
import { BsChevronLeft, BsChevronRight } from "react-icons/bs";
import debounce from "lodash/debounce";

const base_url = "http://localhost:8000/api";

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
  const ref = useRef<HTMLUListElement>(null);
  const [scrolled, setScrolled] = useState(false);

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
        setAllMovies(data.data);
        setIsLoading(false);
      });
  }, [category, setAllMovies, setIsLoading]);

  const slideLeft = () => {
    const slider = document.getElementById(`slider-${category}`)!;
    slider.scrollLeft = slider.scrollLeft - slider.offsetWidth;
  };

  const slideRight = () => {
    const slider = document.getElementById(`slider-${category}`)!;
    slider.scrollLeft = slider.scrollLeft + slider.offsetWidth;
  };

  const handleScroll = () => {
    setScrolled(true);
    console.log("scroll");

    setTimeout(() => {
      setScrolled(false);
      console.log("timeout");
    }, 100);
  };

  return (
    !isLoading && (
      <ul className="" ref={ref}>
        <h1 className="ml-16 relative text-3xl text-neutral-200 top-8">
          {categoryFormattedHeading}
        </h1>

        <div className="flex flex-row items-center group">
          <div
            className="h-64 absolute z-[999999999] left-0 bg-black hidden group-hover:block group-hover:bg-opacity-70 group/arrow"
            onClick={slideLeft}
          >
            <h1 className="text-4xl h-60 flex items-center justify-center cursor-pointer w-16 group-hover/arrow:scale-110">
              <BsChevronLeft />
            </h1>
          </div>

          <div
            onScroll={debounce(handleScroll, 300)}
            id={`slider-${category}`}
            className="scroll-smooth flex px-16 overflow-auto py-10 no-scrollbar"
          >
            {allMovies.map((movie: Movie) => (
              <MovieCard
                key={movie.id}
                movie={movie}
                scrolled={scrolled}
                setScrolled={setScrolled}
              />
            ))}
          </div>

          <div
            className="h-64 absolute right-0 z-[999999999] opacity-50 bg-black hidden group-hover:block group-hover:opacity-70 group/arrow"
            onClick={slideRight}
          >
            <h1 className="text-4xl h-60 flex items-center justify-center cursor-pointer w-16 group-hover/arrow:scale-125">
              <BsChevronRight />
            </h1>
          </div>
        </div>
      </ul>
    )
  );
}
