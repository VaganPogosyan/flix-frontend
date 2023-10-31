"use client";
import Image from "next/image";
import { useEffect, useState } from "react";
import popcorn from "../../public/popcorn.jpg";

const base_url = "http://localhost:8000/api";

interface Props {
  category: string;
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

export default function MoviesRow({ category }: Props) {
  const [allMovies, setAllMovies] = useState<Movie[]>([])!;
  const [isLoading, setIsLoading] = useState<boolean>(false);

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
  }, []);

  return (
    <div>
      <ul className="flex flex-row mx-16">
        {isLoading
          ? "...Loading"
          : allMovies.map((el) => (
              <li key={el.id} className="min-w-fit m-2">
                <Image
                  width={170}
                  height={100}
                  loader={() =>
                    el.poster_path
                      ? `https://image.tmdb.org/t/p/w300${el.poster_path}`
                      : "https://media.istockphoto.com/id/1147544807/vector/thumbnail-image-vector-graphic.jpg?s=612x612&w=0&k=20&c=rnCKVbdxqkjlcs3xH87-9gocETqpspHFXu5dIGB4wuM="
                  }
                  src={`https://image.tmdb.org/t/p/original${el.poster_path}`}
                  alt=""
                />
                {/* <img
                  src={`https://image.tmdb.org/t/p/w300/${el.poster_path}`}
                  alt=""
                /> */}
                {/* {el.name} */}
              </li>
            ))}
      </ul>
    </div>
  );
}
