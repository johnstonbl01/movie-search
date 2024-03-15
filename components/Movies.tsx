'use client';
import type { ChangeEventHandler } from 'react';

import { useState } from 'react';

import { useDebounce } from '@/hooks/useDebounce';

import { SearchInput } from './SearchInput';

export const Movies = () => {
  const [movies, setMovies] = useState([]);
  const [searchValue, setSearchValue] = useState('');

  const searchMovies = useDebounce(() => {
    console.log('*** DEBOUNCE: ', searchValue);
  });

  const onSearchChange: ChangeEventHandler<HTMLInputElement> = (evt) => {
    setSearchValue(evt.target.value);
    searchMovies();
  };

  return (
    <>
      <SearchInput searchValue={searchValue} onChange={onSearchChange} />
    </>
  );
};
