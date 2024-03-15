'use server';

import { MOVIE_API_URL } from '@/utils/constants';

type Movie = {
  id: string;
  title: string;
  posterUrl: string;
  rating: string;
};

type MoviesAPIResponse = {
  data: Movie[];
  totalPages: number;
};

export const fetchMovies = async () => {
  const response = await fetch(`${MOVIE_API_URL}/movies`, {
    method: 'GET',
    headers: {
      Authorization: `Bearer ${process.env.MOVIE_API_TOKEN}`
    }
  });

  const parsedResponse = (await response.json()) as MoviesAPIResponse;

  return parsedResponse;
};
