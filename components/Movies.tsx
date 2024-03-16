'use client';
import type { ChangeEventHandler } from 'react';
import type { Movie, MovieGenre } from '@/server-actions/fetch-movies';

import { useState } from 'react';

import { useDebounce } from '@/hooks/useDebounce';
import { fetchMovies } from '@/server-actions/fetch-movies';

import { SearchInput } from './SearchInput';
import { MovieList } from './MovieList';
import { MoviePagination } from './MoviePagination';

export const Movies = () => {
  const [movies, setMovies] = useState<Movie[]>([]);
  const [movieGenre, setMovieGenre] = useState<MovieGenre>('All');
  const [searchValue, setSearchValue] = useState<string>('');
  const [searchPage, setSearchPage] = useState<number>(1);
  const [totalPages, setTotalPages] = useState<number>(1);
  const [loading, setLoading] = useState<boolean>(false);

  const searchMovies = useDebounce(async () => {
    if (searchValue === '') {
      return null;
    }

    setLoading(true);

    const searchResults = await fetchMovies(searchValue, searchPage, movieGenre);
    setMovies(searchResults.data);
    setSearchPage(1);
    setTotalPages(searchResults.totalPages);

    setLoading(false);
    return searchResults;
  });

  const onSearchChange: ChangeEventHandler<HTMLInputElement> = (evt) => {
    setSearchValue(evt.target.value);
    searchMovies();
  };

  const onNextPageClick = () => {
    setSearchPage((currentPage) => currentPage + 1);
    searchMovies();
  };

  const onPrevPageClick = () => {
    setSearchPage((currentPage) => currentPage - 1);
    searchMovies();
  };

  const onGenreChange = (genre: MovieGenre) => {
    setMovieGenre(genre);

    if (searchValue !== '') {
      searchMovies();
    }
  };

  const onResetSearch = () => {
    setSearchValue('');
    setSearchPage(1);
  };

  return (
    <>
      <SearchInput
        searchValue={searchValue}
        onSearchChange={onSearchChange}
        movieGenre={movieGenre}
        onGenreChange={onGenreChange}
        onResetClick={onResetSearch}
      />
      <MovieList movies={movies} loading={loading} />
      <MoviePagination
        currentPage={searchPage}
        totalPages={totalPages}
        hasMovies={movies?.length > 0}
        onNextPage={onNextPageClick}
        onPrevPage={onPrevPageClick}
      />
    </>
  );
};
