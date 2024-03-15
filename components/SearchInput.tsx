import type { ChangeEventHandler } from 'react';
import type { MovieGenre } from '@/server-actions/fetch-movies';

import {
  TextFieldRoot,
  TextFieldInput,
  TextFieldSlot,
  Flex,
  SelectRoot,
  SelectTrigger,
  SelectContent,
  SelectItem,
  IconButton
} from '@radix-ui/themes';
import { MagnifyingGlassIcon, Cross1Icon } from '@radix-ui/react-icons';
import { Label } from '@radix-ui/react-label';

import { MOVIE_GENRES } from '@/utils/constants';

import styles from './SearchInput.module.scss';

type SearchInputProps = {
  searchValue: string;
  movieGenre: MovieGenre;
  onSearchChange: ChangeEventHandler<HTMLInputElement>;
  onGenreChange: (genre: MovieGenre) => void;
  onResetClick: () => void;
};

export const SearchInput = ({
  searchValue,
  onSearchChange,
  movieGenre,
  onGenreChange,
  onResetClick
}: SearchInputProps) => {
  return (
    <Flex gap="2" mb="3">
      <Label htmlFor="movie-search" className={styles.input}>
        Title:
        <TextFieldRoot className={styles.searchField}>
          <TextFieldSlot>
            <MagnifyingGlassIcon height="16" width="16" />
          </TextFieldSlot>
          <TextFieldInput
            name="movie-search"
            radius="small"
            size="3"
            placeholder="Search for a movie..."
            value={searchValue}
            onChange={onSearchChange}
          />
          {searchValue && (
            <TextFieldSlot>
              <IconButton variant="ghost" onClick={onResetClick}>
                <Cross1Icon width="16" height="16" />
              </IconButton>
            </TextFieldSlot>
          )}
        </TextFieldRoot>
      </Label>
      <Label htmlFor="movie-genre" className={styles.input}>
        Genre:
        <SelectRoot size="3" value={movieGenre} onValueChange={onGenreChange} name="movie-genre">
          <SelectTrigger placeholder="All" className={styles.genreField} />
          <SelectContent>
            {MOVIE_GENRES.map((genre) => (
              <SelectItem key={`select-genre-${genre}`} value={genre} className={styles.genreField}>
                {genre}
              </SelectItem>
            ))}
          </SelectContent>
        </SelectRoot>
      </Label>
    </Flex>
  );
};
