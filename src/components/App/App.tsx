import { useState } from "react";
import MovieModal from "../MovieModal/MovieModal";
import { keepPreviousData, useQuery } from "@tanstack/react-query";
import { Toaster, toast } from "react-hot-toast";
import { fetchMovies } from "../../services/movieService";
import SearchBar from "../SearchBar/SearchBar";
import type { Movie } from "../../types/movie";
import MovieGrid from "../MovieGrid/MovieGrid";
import Loader from "../Loader/Loader";

import Pagination from "../Pagination/Pagination";
import ErrorMessage from "../ErrorMessage/ErrorMessage";

export default function App() {
  const [searchQuery, setSearchQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedMovie, setSelectedMovie] = useState<Movie | null>(null);
  const { data, isLoading, isError, isSuccess } = useQuery({
    queryKey: ["movies", searchQuery, currentPage],
    queryFn: () => fetchMovies(searchQuery, currentPage),
    enabled: searchQuery !== "",
    placeholderData: keepPreviousData,
  });
  const handleSearch = (query: string) => {
    setSearchQuery(query);
    setCurrentPage(1);
  };
  const openModal = (movie: Movie) => {
    setIsModalOpen(true);
    setSelectedMovie(movie);
  };
  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedMovie(null);
  };
  const totalPages = data?.total_pages ?? 0;
  return (
    <>
      <Toaster position="top-right" />
      <SearchBar onSubmit={handleSearch} />

      {isSuccess && totalPages > 1 && (
        <Pagination
          page={currentPage}
          total={totalPages}
          onChange={setCurrentPage}
        />
      )}
      {isLoading && <Loader />}
      {isError && <ErrorMessage />}
      {isSuccess &&
        data.results.length === 0 &&
        toast.error("No movies found.")}

      {isSuccess && data.results.length > 0 && (
        <>
          <MovieGrid movies={data.results} onSelect={openModal} />
          {isModalOpen && selectedMovie && (
            <MovieModal movie={selectedMovie} onClose={closeModal} />
          )}
        </>
      )}
    </>
  );
}
