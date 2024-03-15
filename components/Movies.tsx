'use client';
import type { ChangeEventHandler, MouseEventHandler } from 'react';
import type { Movie, MovieGenre } from '@/server-actions/fetch-movies';

import { useState, Suspense } from 'react';
import { Button, Text } from '@radix-ui/themes';

import { useDebounce } from '@/hooks/useDebounce';
import { fetchMovies } from '@/server-actions/fetch-movies';

import { SearchInput } from './SearchInput';
import { MovieList } from './MovieList';

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

  const onPageChange = (pageNumber: number): MouseEventHandler<HTMLButtonElement> => {
    return () => {
      setSearchPage(pageNumber);
      searchMovies();
    };
  };

  const onGenreChange = (genre: MovieGenre) => {
    setMovieGenre(genre);

    if (searchValue !== '') {
      searchMovies();
    }
  };

  return (
    <>
      <SearchInput
        searchValue={searchValue}
        onSearchChange={onSearchChange}
        movieGenre={movieGenre}
        onGenreChange={onGenreChange}
      />
      <MovieList movies={movies} />
      {movies?.length > 0 && (
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
