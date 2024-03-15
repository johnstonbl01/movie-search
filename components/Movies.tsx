'use client';
import type { ChangeEventHandler, MouseEventHandler } from 'react';
import type { Movie, MovieGenre } from '@/server-actions/fetch-movies';

import { useState } from 'react';
import { Button, Text } from '@radix-ui/themes';
import { Label } from '@radix-ui/react-label';

import { useDebounce } from '@/hooks/useDebounce';
import { fetchMovies } from '@/server-actions/fetch-movies';

import { SearchInput } from './SearchInput';
import { MovieList } from './MovieList';
import { MoviePagination } from './MoviePagination';

export const Movies = () => {
  const [movies, setMovies] = useState<Movie[]>([]);
  const [movieGenre, setMovieGenre] = useState<MovieGenre>('All');
  const [searchValue, setSearchValue] = useState('');
  const [searchPage, setSearchPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [loading, setLoading] = useState(false);

  const searchMovies = useDebounce(async () => {
    if (searchValue === '') {
      return null;
    }

    const searchResults = await fetchMovies(searchValue, searchPage, movieGenre);
    setMovies(searchResults.data);

    if (searchResults.totalPages > 1) {
      setTotalPages(searchResults.totalPages);
    }

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
      <MovieList movies={movies} />
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
