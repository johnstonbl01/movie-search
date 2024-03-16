'use server';

import { MOVIE_API_URL, MOVIE_GENRES } from '@/utils/constants';

export type Movie = {
  id: string;
  title: string;
  posterUrl: string;
  rating: string;
};

export type MovieGenre = (typeof MOVIE_GENRES)[number];

export type Genre = {
  id: string;
  title: MovieGenre;
};

export type MovieDetails = {
  id: string;
  title: string;
  posterUrl: string;
  rating: string;
  summary: string;
  duration: string;
  directors: string[];
  mainActors: string[];
  datePublished: string;
  ratingValue: number;
  bestRating: number;
  worstRating: number;
  writers: string[];
  genres: Genre[];
};

type MoviesAPIResponse = {
  data: Movie[];
  totalPages: number;
};

export const fetchMovies = async (search: string, page: number, genre: MovieGenre) => {
  const baseUrl = `${MOVIE_API_URL}/movies?search=${search}&page=${page}&limit=21`;
  const searchUrl = genre !== 'All' ? `${baseUrl}&genre=${genre}` : baseUrl;

  const response = await fetch(searchUrl, {
    method: 'GET',
    headers: {
      Authorization: `Bearer ${process.env.MOVIE_API_TOKEN}`
    }
  });

  const parsedResponse = (await response.json()) as MoviesAPIResponse;

  return parsedResponse;
};

export const fetchMovieDetails = async (movieId: string) => {
  const searchUrl = `${MOVIE_API_URL}/movies/${movieId}`;

  const response = await fetch(searchUrl, {
    method: 'GET',
    headers: {
      Authorization: `Bearer ${process.env.MOVIE_API_TOKEN}`
    }
  });

  const parsedResponse = (await response.json()) as MovieDetails;

  return parsedResponse;
};
