import type { Movie } from '@/server-actions/fetch-movies';

import Image from 'next/image';
import { Card, Heading, Flex } from '@radix-ui/themes';
import { CrossCircledIcon } from '@radix-ui/react-icons';

import styles from './MovieCard.module.scss';

type MovieCardProps = {
  movie: Movie;
};

type MoviePoster = {
  posterUrl: string | undefined;
  title: string;
};

const MoviePoster = ({ posterUrl, title }: MoviePoster) => {
  if (!posterUrl) {
    return (
      <div className={styles.posterPlaceholder}>
        <CrossCircledIcon width="24" height="24" color="gray" />
      </div>
    );
  }

  return (
    <div className={styles.imageContainer}>
      <Image
        src={posterUrl}
        alt={`Movie poster for ${title}`}
        fill
        sizes="(max-width: 1800px) 5vw"
      />
    </div>
  );
};

export const MovieCard = ({ movie }: MovieCardProps) => {
  return (
    <Card asChild key={movie.id} className={styles.movieCard}>
      <li>
        <MoviePoster posterUrl={movie.posterUrl} title={movie.title} />
        <Heading as="h3" className={styles.movieTitle}>
          {movie.title}
        </Heading>
      </li>
    </Card>
  );
};
