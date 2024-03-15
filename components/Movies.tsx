'use client';
import type { ChangeEventHandler } from 'react';
import type { Movie } from '@/server-actions/fetch-movies';

import { useState } from 'react';

import { useDebounce } from '@/hooks/useDebounce';
import { fetchMovies } from '@/server-actions/fetch-movies';

import { SearchInput } from './SearchInput';

export const Movies = () => {
  const [movies, setMovies] = useState<Movie[]>([]);
  const [searchValue, setSearchValue] = useState('');
  const [searchPage, setSearchPage] = useState(1);

  const searchMovies = useDebounce(async () => {
    const searchResults = await fetchMovies(searchValue, searchPage);
    setMovies(searchResults.data);
  });

  const onSearchChange: ChangeEventHandler<HTMLInputElement> = (evt) => {
    setSearchValue(evt.target.value);
    searchMovies();
  };

  return (
    <>
      <SearchInput searchValue={searchValue} onChange={onSearchChange} />
      {movies.map((movie) => (
        <p key={movie.id}>{movie.title}</p>
      ))}
    </>
  );
};
