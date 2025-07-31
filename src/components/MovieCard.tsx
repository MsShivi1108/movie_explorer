import React from 'react';
import { Calendar, Star } from 'lucide-react';
import { Movie } from '../types/movie';

interface MovieCardProps {
  movie: Movie;
  onClick: (movie: Movie) => void;
}

export const MovieCard: React.FC<MovieCardProps> = ({ movie, onClick }) => {
  const handleImageError = (e: React.SyntheticEvent<HTMLImageElement>) => {
    e.currentTarget.src = 'https://via.placeholder.com/300x450/374151/9CA3AF?text=No+Image';
  };

  return (
    <div
      onClick={() => onClick(movie)}
      className="group bg-gray-800 rounded-lg overflow-hidden shadow-lg hover:shadow-2xl transform hover:scale-105 transition-all duration-300 cursor-pointer"
    >
      <div className="relative overflow-hidden">
        <img
          src={movie.Poster !== 'N/A' ? movie.Poster : 'https://via.placeholder.com/300x450/374151/9CA3AF?text=No+Image'}
          alt={movie.Title}
          onError={handleImageError}
          className="w-full h-72 object-cover group-hover:scale-110 transition-transform duration-300"
          loading="lazy"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
        <div className="absolute bottom-4 left-4 right-4 transform translate-y-4 group-hover:translate-y-0 opacity-0 group-hover:opacity-100 transition-all duration-300">
          <div className="flex items-center gap-2 text-white text-sm">
            <Calendar className="w-4 h-4" />
            <span>{movie.Year}</span>
            {movie.imdbRating && (
              <>
                <Star className="w-4 h-4 fill-yellow-400 text-yellow-400 ml-2" />
                <span>{movie.imdbRating}</span>
              </>
            )}
          </div>
        </div>
      </div>
      
      <div className="p-4">
        <h3 className="text-white font-semibold text-lg mb-2 line-clamp-2 group-hover:text-red-400 transition-colors">
          {movie.Title}
        </h3>
        <p className="text-gray-400 text-sm">
          {movie.Type} • {movie.Year}
        </p>
      </div>
    </div>
  );
};