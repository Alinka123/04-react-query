import axios from "axios";
import type { Movie } from "../types/movie";

const VITE_TMDB_TOKEN = import.meta.env.VITE_TMDB_TOKEN;
axios.defaults.baseURL = "https://api.themoviedb.org/3";

interface FetchMovieResp {
  results: Movie[];
}

export const fetchMovies = async (query: string): Promise<Movie[]> => {
  const response = await axios.get<FetchMovieResp>("/search/movie", {
    params: {
      query,
    },
    headers: {
      Authorization: `Bearer ${VITE_TMDB_TOKEN}`,
    },
  });
  return response.data.results;
};
