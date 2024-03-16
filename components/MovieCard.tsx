import type { Movie } from '@/server-actions/fetch-movies';

import clsx from 'clsx';
import Image from 'next/image';
import { useState } from 'react';
import { Card, Heading } from '@radix-ui/themes';
import { CrossCircledIcon } from '@radix-ui/react-icons';

import { MovieDetailDialog } from './MovieDetailDialog';
import styles from './MovieCard.module.scss';

type MovieCardProps = {
  movie: Movie;
};

type MoviePoster = {
  posterUrl: string | undefined;
  title: string;
};

export const MovieCardSkeleton = () => {
  return (
    <Card asChild className={styles.movieCard}>
      <li>
        <div className={clsx(styles.skeleton, styles.posterSkeleton)} />
        <div className={clsx(styles.skeleton, styles.titleSkeleton)} />
      </li>
    </Card>
  );
};

export const MoviePoster = ({ posterUrl, title }: MoviePoster) => {
  if (!posterUrl) {
    return (
      <div className={styles.posterUnknown}>
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
  const [showMovieDetails, setShowMovieDetails] = useState<boolean>(false);

  const onCardClick = () => setShowMovieDetails((currentValue) => !currentValue);
  const onCloseClick = () => setShowMovieDetails(false);

  return (
    <>
      {showMovieDetails && (
        <MovieDetailDialog movieId={movie.id} open={showMovieDetails} onCloseClick={onCloseClick} />
      )}
      <Card asChild className={styles.movieCard} onClick={onCardClick}>
        <li>
          <MoviePoster posterUrl={movie.posterUrl} title={movie.title} />
          <Heading as="h3" className={styles.movieTitle}>
            {movie.title}
          </Heading>
        </li>
      </Card>
    </>
  );
};
