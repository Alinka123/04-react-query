import axios from "axios";
import type { Movie } from "../types/movie";

const VITE_TMDB_TOKEN = import.meta.env.VITE_TMDB_TOKEN;
axios.defaults.baseURL = "https://api.themoviedb.org/3";

interface FetchMovieResp {
  page: number;
  total_pages: number;
  results: Movie[];
}

export const fetchMovies = async (
  query: string,
  page: number = 1
): Promise<FetchMovieResp> => {
  const response = await axios.get<FetchMovieResp>("/search/movie", {
    params: {
      query,
      page,
    },
    headers: {
      Authorization: `Bearer ${VITE_TMDB_TOKEN}`,
    },
  });
  return response.data;
};
