"use client";
import { useEffect, useState } from "react";
import MoviesRow from "./MoviesRow";
import Spinner from "./Spinner";
import BigMovie from "./BigMovie";
import { Movie } from "./types";
import { getCookie } from "../utils/cookieFunctions";

const categories = [
  "trending",
  // "action_movies",
  "top_rated_movies",
  "popular_movies",
  "top_rated_tvshows",
  "popular_tvshows",
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

const defaultMovie = {
  adult: false,
  backdrop_path: "",
  id: 0,
  title: "",
  original_language: "",
  original_title: "",
  overview: "",
  poster_path: "",
  media_type: "movie",
  genre_ids: [],
  popularity: 209.021,
  release_date: "",
  video: false,
  vote_average: 0,
  vote_count: 0,
};

const base_url = "http://localhost:8000/api";

export default function AllMovies() {
  const [isLoading, setIsLoading] = useState(false);
  const [randomMovie, setRandomMovie] = useState<Movie>(defaultMovie);
  // const [profileId, setProfileId] = useState("");

  // useEffect(() => {
  //   setProfileId(getCookie("FlixProfileId"));
  // }, [profileId]);

  useEffect(() => {
    fetch(`${base_url}/movies/random_movie`)
      .then((response) => response.json())
      .then((data) => {
        setRandomMovie(data.data);
      });
  }, []);

  return (
    <div className="max-w-screen overflow-hidden">
      {isLoading ? (
        <div className="w-full flex justify-center items-center">
          <div className="w-fit">
            <Spinner />
          </div>
        </div>
      ) : (
        <div>
          <BigMovie
            randomMovie={randomMovie}
            isTV={
              randomMovie.media_type !== "movie" && !!randomMovie.first_air_date
            }
          />
          <ul className="">
            {categories.map((category: string) => (
              <li key={category}>
                <MoviesRow
                  category={category}
                  setIsLoading={setIsLoading}
                  isLoading={isLoading}
                />
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}
