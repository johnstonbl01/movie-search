import { fetchMovies } from './fetch-movies.action';

export default async function Home() {
  const movies = await fetchMovies();

  return <main>Movie Search</main>;
}
