import type { MovieDetails } from '@/server-actions/fetch-movies';

import clsx from 'clsx';
import { useState, useEffect } from 'react';
import {
  DialogRoot,
  DialogClose,
  DialogContent,
  Flex,
  IconButton,
  Text,
  DialogTitle,
  Badge,
  Box
} from '@radix-ui/themes';
import { Cross1Icon } from '@radix-ui/react-icons';

import { fetchMovieDetails } from '@/server-actions/fetch-movies';

import { MoviePoster } from './MovieCard';
import cardStyles from './MovieCard.module.scss';
import styles from './MovieDetailDialog.module.scss';

type MovieDetailDialogProps = {
  open: boolean;
  movieId: string;
  onCloseClick: () => void;
};

const parseDuration = (duration: string | undefined) => {
  if (!duration) {
    return '';
  }

  const [hours, minutes] = duration.replace('PT', '').split('H');
  return `${hours}h${minutes.replace('M', '').padStart(2, '0')}m`;
};

const MovieDetailSkeleton = () => {
  return (
    <>
      <div className={clsx(cardStyles.skeleton, cardStyles.posterSkeleton)} />
      <Flex direction="column" className={styles.summary}>
        <div className={clsx(cardStyles.skeleton, styles.summaryLineSkeleton)} />
        <div className={clsx(cardStyles.skeleton, styles.summaryLineSkeleton)} />
        <div className={clsx(cardStyles.skeleton, styles.summaryLineSkeleton)} />
      </Flex>
    </>
  );
};

export const MovieDetailDialog = ({ open, movieId, onCloseClick }: MovieDetailDialogProps) => {
  const [movie, setMovie] = useState<MovieDetails | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchMovie = async () => {
      const movieDetails = await fetchMovieDetails(movieId);
      setMovie(movieDetails);
      setLoading(false);
    };

    if (!movie) {
      fetchMovie();
    }
  }, [movieId, movie]);

  return (
    <DialogRoot open={open}>
      <DialogContent className={styles.container}>
        <Flex justify="end" mb="4">
          <DialogClose>
            <IconButton variant="ghost" onClick={onCloseClick}>
              <Cross1Icon height="16" width="16" />
            </IconButton>
          </DialogClose>
        </Flex>
        <DialogTitle align="left" mb="5" size="6">
          <strong>{movie?.title}</strong>
        </DialogTitle>
        <Flex>
          {loading && <MovieDetailSkeleton />}
          {!loading && (
            <>
              <MoviePoster posterUrl={movie?.posterUrl} title={movie?.title || ''} />
              <Flex direction="column" className={styles.summary}>
                <Text size="1" ml="4">
                  {movie?.summary}
                </Text>

                <Flex ml="4" justify="between" mt="2" mb="4">
                  <Box>
                    <Text as="p" size="2">
                      Rated
                    </Text>
                    <Text as="p" size="1">
                      {movie?.rating}
                    </Text>
                  </Box>
                  <Box>
                    <Text as="p" size="2">
                      Runtime
                    </Text>
                    <Text as="p" size="1">
                      {parseDuration(movie?.duration)}
                    </Text>
                  </Box>
                </Flex>

                <ul className={styles.actorList}>
                  <Text as="p">Starring:</Text>
                  {movie?.mainActors.map((actorName) => (
                    <Text key={actorName} size="1">
                      {actorName}
                    </Text>
                  ))}
                </ul>

                <ul className={styles.actorList}>
                  <Text as="p">Written by:</Text>
                  {movie?.writers.map((writerName) => (
                    <Text key={writerName} size="1">
                      {writerName}
                    </Text>
                  ))}
                </ul>

                <Flex ml="4" gap="2" mt="5" justify="end">
                  {movie?.genres.map((genre) => <Badge key={genre.id}>{genre.title}</Badge>)}
                </Flex>
              </Flex>
            </>
          )}
        </Flex>
      </DialogContent>
    </DialogRoot>
  );
};
