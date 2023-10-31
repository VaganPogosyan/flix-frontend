"use client";
import { useState } from "react";
import MoviesRow from "./MoviesRow";
import Spinner from "./Spinner";

const categories = [
  "trending",
  "top_rated_movies",
  "popular_movies",
  "top_rated_tvshows",
  "popular_tvshows",
  //   "action_movies",
  //   "adventure_movies",
  //   "animation_movies",
  //   "comedy_movies",
  //   "crime_movie",
  //   "documentary_movies",
  //   "drama_movies",
  //   "family_movies",
  //   "fantasy_movies",
  //   "horror_movies",
  //   "romance_movies",
  //   "science_fiction_movies",
  //   "thriller_movies",
  //   "western_movies",
  //   "action_adventure_tvshows",
  //   "reality_tvshows",
  //   "scifi_fantasy_tvshows",
]!;

export default function AllMovies() {
  const [isLoading, setIsLoading] = useState(false);

  return (
    <div>
      <ul>
        {isLoading ? (
          <Spinner />
        ) : (
          categories.map((category: string) => (
            <li key={category}>
              <MoviesRow
                category={category}
                setIsLoading={setIsLoading}
                isLoading={isLoading}
              />
            </li>
          ))
        )}
      </ul>
    </div>
  );
}
