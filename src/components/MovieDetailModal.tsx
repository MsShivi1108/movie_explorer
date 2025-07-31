import React, { useState, useEffect } from 'react';
import { X, Calendar, Clock, Star, Globe, Award, Users } from 'lucide-react';
import { Movie, MovieDetail } from '../types/movie';
import { MovieService } from '../services/movieService';
import { LoadingSpinner } from './LoadingSpinner';

interface MovieDetailModalProps {
  movie: Movie | null;
  isOpen: boolean;
  onClose: () => void;
}

export const MovieDetailModal: React.FC<MovieDetailModalProps> = ({
  movie,
  isOpen,
  onClose
}) => {
  const [movieDetails, setMovieDetails] = useState<MovieDetail | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (movie && isOpen) {
      fetchMovieDetails();
    }
  }, [movie, isOpen]);

  const fetchMovieDetails = async () => {
    if (!movie) return;
    
    setLoading(true);
    setError(null);
    
    try {
      const details = await MovieService.getMovieDetails(movie.imdbID);
      setMovieDetails(details);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to load movie details');
    } finally {
      setLoading(false);
    }
  };

  const handleImageError = (e: React.SyntheticEvent<HTMLImageElement>) => {
    e.currentTarget.src = 'https://via.placeholder.com/400x600/374151/9CA3AF?text=No+Image';
  };

  if (!isOpen || !movie) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center p-4 z-50 backdrop-blur-sm">
      <div className="bg-gray-900 rounded-lg max-w-4xl w-full max-h-[90vh] overflow-y-auto relative">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-400 hover:text-white bg-gray-800 hover:bg-gray-700 rounded-full p-2 transition-colors z-10"
        >
          <X className="w-6 h-6" />
        </button>

        {loading ? (
          <div className="p-8">
            <LoadingSpinner />
          </div>
        ) : error ? (
          <div className="p-8 text-center">
            <div className="text-red-400 text-lg mb-2">Error loading details</div>
            <div className="text-gray-400">{error}</div>
          </div>
        ) : movieDetails ? (
          <div className="flex flex-col md:flex-row">
            <div className="md:w-1/3 p-6">
              <img
                src={movieDetails.Poster !== 'N/A' ? movieDetails.Poster : 'https://via.placeholder.com/400x600/374151/9CA3AF?text=No+Image'}
                alt={movieDetails.Title}
                onError={handleImageError}
                className="w-full rounded-lg shadow-lg"
              />
            </div>
            
            <div className="md:w-2/3 p-6">
              <h1 className="text-3xl font-bold text-white mb-4">{movieDetails.Title}</h1>
              
              <div className="flex flex-wrap gap-4 mb-6 text-sm">
                {movieDetails.Released && (
                  <div className="flex items-center gap-1 text-gray-300">
                    <Calendar className="w-4 h-4" />
                    <span>{movieDetails.Released}</span>
                  </div>
                )}
                {movieDetails.Runtime && (
                  <div className="flex items-center gap-1 text-gray-300">
                    <Clock className="w-4 h-4" />
                    <span>{movieDetails.Runtime}</span>
                  </div>
                )}
                {movieDetails.imdbRating && (
                  <div className="flex items-center gap-1 text-yellow-400">
                    <Star className="w-4 h-4 fill-current" />
                    <span>{movieDetails.imdbRating}/10</span>
                  </div>
                )}
                {movieDetails.Country && (
                  <div className="flex items-center gap-1 text-gray-300">
                    <Globe className="w-4 h-4" />
                    <span>{movieDetails.Country}</span>
                  </div>
                )}
              </div>

              {movieDetails.Genre && (
                <div className="mb-4">
                  <div className="flex flex-wrap gap-2">
                    {movieDetails.Genre.split(', ').map((genre, index) => (
                      <span
                        key={index}
                        className="px-3 py-1 bg-red-600 text-white rounded-full text-sm"
                      >
                        {genre}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              {movieDetails.Plot && (
                <div className="mb-6">
                  <h3 className="text-xl font-semibold text-white mb-2">Plot</h3>
                  <p className="text-gray-300 leading-relaxed">{movieDetails.Plot}</p>
                </div>
              )}

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {movieDetails.Director && (
                  <div>
                    <h4 className="font-semibold text-white mb-1">Director</h4>
                    <p className="text-gray-300">{movieDetails.Director}</p>
                  </div>
                )}
                
                {movieDetails.Writer && (
                  <div>
                    <h4 className="font-semibold text-white mb-1">Writer</h4>
                    <p className="text-gray-300">{movieDetails.Writer}</p>
                  </div>
                )}
                
                {movieDetails.Actors && (
                  <div className="md:col-span-2">
                    <h4 className="font-semibold text-white mb-1 flex items-center gap-2">
                      <Users className="w-4 h-4" />
                      Cast
                    </h4>
                    <p className="text-gray-300">{movieDetails.Actors}</p>
                  </div>
                )}

                {movieDetails.Awards && movieDetails.Awards !== 'N/A' && (
                  <div className="md:col-span-2">
                    <h4 className="font-semibold text-white mb-1 flex items-center gap-2">
                      <Award className="w-4 h-4" />
                      Awards
                    </h4>
                    <p className="text-gray-300">{movieDetails.Awards}</p>
                  </div>
                )}
              </div>
            </div>
          </div>
        ) : null}
      </div>
    </div>
  );
};