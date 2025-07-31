import React from 'react';
import { MovieCard } from './MovieCard';
import { LoadingSpinner } from './LoadingSpinner';
import { Movie } from '../types/movie';

interface MovieGridProps {
  movies: Movie[];
  loading: boolean;
  error: string | null;
  onMovieClick: (movie: Movie) => void;
}

export const MovieGrid: React.FC<MovieGridProps> = ({ 
  movies, 
  loading, 
  error, 
  onMovieClick 
}) => {
  if (loading) {
    return <LoadingSpinner />;
  }

  if (error) {
    return (
      <div className="text-center py-12">
        <div className="text-red-400 text-lg mb-2">Oops! Something went wrong</div>
        <div className="text-gray-400">{error}</div>
      </div>
    );
  }

  if (movies.length === 0) {
    return (
      <div className="text-center py-12">
        <div className="text-gray-400 text-lg mb-2">No movies found</div>
        <div className="text-gray-500">Try searching for something else</div>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 gap-6">
      {movies.map((movie) => (
        <MovieCard
          key={movie.imdbID}
          movie={movie}
          onClick={onMovieClick}
        />
      ))}
    </div>
  );
};