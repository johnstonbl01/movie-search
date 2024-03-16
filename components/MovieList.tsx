import { Flex } from '@radix-ui/themes';

import { Movie } from '@/server-actions/fetch-movies';

import styles from './MovieList.module.scss';
import { MovieCard, MovieCardSkeleton } from './MovieCard';

type MovieListProps = {
  movies: Movie[];
  loading: boolean;
};

export const MovieList = ({ movies, loading }: MovieListProps) => {
  return (
    <Flex asChild wrap="wrap" className={styles.list} gap="2">
      <ul>
        {loading &&
          Array.from({ length: 14 }, (_element, idx) => idx).map((idx) => (
            <MovieCardSkeleton key={`movie-card-skeleton-${idx}`} />
          ))}
        {!loading &&
          movies.map((movie) => {
            return <MovieCard key={movie.id} movie={movie} />;
          })}
      </ul>
    </Flex>
  );
};
