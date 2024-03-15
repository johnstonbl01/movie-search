import Image from 'next/image';
import { Card, Heading, Flex } from '@radix-ui/themes';

import { Movie } from '@/server-actions/fetch-movies';

type MovieListProps = {
  movies: Movie[];
};

// TODO: Handle missing image src
export const MovieList = ({ movies }: MovieListProps) => {
  return (
    <Flex asChild wrap="wrap">
      <ul>
        {movies.map((movie) => {
          return (
            <Card asChild key={movie.id}>
              <li>
                <div
                  style={{ position: 'relative', width: 100, height: 150, objectFit: 'contain' }}
                >
                  <Image
                    src={movie.posterUrl}
                    alt={`Movie poster for ${movie.title}`}
                    fill
                    sizes="(max-width: 1800px) 5vw"
                  />
                </div>
                <Heading>{movie.title}</Heading>
              </li>
            </Card>
          );
        })}
      </ul>
    </Flex>
  );
};
