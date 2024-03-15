import { Flex } from '@radix-ui/themes';

import { Movie } from '@/server-actions/fetch-movies';

import styles from './MovieList.module.scss';
import { MovieCard } from './MovieCard';

type MovieListProps = {
  movies: Movie[];
};

export const MovieList = ({ movies }: MovieListProps) => {
  return (
    <Flex asChild wrap="wrap" className={styles.list} gap="2">
      <ul>
        {movies.map((movie) => (
          <MovieCard key={movie.id} movie={movie} />
        ))}
      </ul>
    </Flex>
  );
};
