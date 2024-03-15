'use client';
import type { ChangeEventHandler, MouseEventHandler } from 'react';
import type { Movie } from '@/server-actions/fetch-movies';

import { useState } from 'react';
import { Button, Text } from '@radix-ui/themes';

import { useDebounce } from '@/hooks/useDebounce';
import { fetchMovies } from '@/server-actions/fetch-movies';

import { SearchInput } from './SearchInput';
import { MovieList } from './MovieList';

export const Movies = () => {
  const [movies, setMovies] = useState<Movie[]>([]);
  const [searchValue, setSearchValue] = useState('');
  const [searchPage, setSearchPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  const searchMovies = useDebounce(async () => {
    console.log({ searchValue, searchPage });
    if (searchValue === '') {
      return null;
    }

    const searchResults = await fetchMovies(searchValue, searchPage);
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

  const onPageChange = (pageNumber: number): MouseEventHandler<HTMLButtonElement> => {
    return () => {
      setSearchPage(pageNumber);
      searchMovies();
    };
  };

  return (
    <>
      <SearchInput searchValue={searchValue} onChange={onSearchChange} />
      <MovieList movies={movies} />
      {movies.length > 0 && (
        <>
          <Text>Page:</Text>
          {Array.from({ length: totalPages }, (_element, idx) => idx + 1).map((pageNumber) => (
            <Button key={`paginator-${pageNumber}`} onClick={onPageChange(pageNumber)}>
              {pageNumber}
            </Button>
          ))}
        </>
      )}
    </>
  );
};
