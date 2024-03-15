import type { ChangeEventHandler } from 'react';
import type { MovieGenre } from '@/server-actions/fetch-movies';

import {
  TextFieldRoot,
  TextFieldInput,
  Flex,
  SelectRoot,
  SelectTrigger,
  SelectContent,
  SelectItem
} from '@radix-ui/themes';

import { MOVIE_GENRES } from '@/utils/constants';

import styles from './SearchInput.module.scss';

type SearchInputProps = {
  searchValue: string;
  movieGenre: MovieGenre;
  onSearchChange: ChangeEventHandler<HTMLInputElement>;
  onGenreChange: (genre: MovieGenre) => void;
};

export const SearchInput = ({
  searchValue,
  onSearchChange,
  movieGenre,
  onGenreChange
}: SearchInputProps) => {
  return (
    <Flex gap="2">
      <TextFieldRoot>
        <TextFieldInput
          className={styles.searchField}
          radius="small"
          size="3"
          placeholder="Search for a movie title"
          value={searchValue}
          onChange={onSearchChange}
        />
      </TextFieldRoot>
      <SelectRoot size="3" value={movieGenre} onValueChange={onGenreChange}>
        <SelectTrigger />
        <SelectContent>
          {MOVIE_GENRES.map((genre) => (
            <SelectItem key={`select-genre-${genre}`} value={genre}>
              {genre}{' '}
            </SelectItem>
          ))}
        </SelectContent>
      </SelectRoot>
    </Flex>
  );
};
