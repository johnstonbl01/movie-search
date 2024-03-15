'use server';

import { MOVIE_API_URL, MOVIE_GENRES } from '@/utils/constants';

export type Movie = {
  id: string;
  title: string;
  posterUrl: string;
  rating: string;
};

export type MovieGenre = (typeof MOVIE_GENRES)[number];

type MoviesAPIResponse = {
  data: Movie[];
  totalPages: number;
};

export const fetchMovies = async (search: string, page: number, genre: MovieGenre) => {
  const baseUrl = `${MOVIE_API_URL}/movies?search=${search}&page=${page}&limit=21`;
  const searchUrl = genre !== 'All' ? `${baseUrl}&genre=${genre}` : baseUrl;

  console.log('searchURL', searchUrl);

  const response = await fetch(searchUrl, {
    method: 'GET',
    headers: {
      Authorization: `Bearer ${process.env.MOVIE_API_TOKEN}`
    }
  });

  const parsedResponse = (await response.json()) as MoviesAPIResponse;
  console.log(parsedResponse);

  return parsedResponse;
};
