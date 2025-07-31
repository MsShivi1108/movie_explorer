import React, { useState, useEffect, useCallback } from 'react';
import { Film, Popcorn } from 'lucide-react';
import { SearchBar } from './components/SearchBar';
import { GenreFilter } from './components/GenreFilter';
import { MovieGrid } from './components/MovieGrid';
import { MovieDetailModal } from './components/MovieDetailModal';
import { MovieService } from './services/movieService';
import { Movie } from './types/movie';

function App() {
  const [movies, setMovies] = useState<Movie[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [selectedGenre, setSelectedGenre] = useState('');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedMovie, setSelectedMovie] = useState<Movie | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const loadPopularMovies = useCallback(async () => {
    setLoading(true);
    setError(null);
    
    try {
      const popularMovies = await MovieService.getPopularMovies();
      setMovies(popularMovies);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to load movies');
    } finally {
      setLoading(false);
    }
  }, []);

  const handleSearch = useCallback(async (query: string) => {
    if (!query.trim()) {
      setSearchQuery('');
      loadPopularMovies();
      return;
    }

    setSearchQuery(query);
    setSelectedGenre('');
    setLoading(true);
    setError(null);
    
    try {
      const searchResults = await MovieService.searchMovies(query);
      setMovies(searchResults.Search || []);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to search movies');
      setMovies([]);
    } finally {
      setLoading(false);
    }
  }, [loadPopularMovies]);

  const handleGenreSelect = useCallback(async (genre: string) => {
    setSelectedGenre(genre);
    setSearchQuery('');
    
    if (!genre) {
      loadPopularMovies();
      return;
    }

    setLoading(true);
    setError(null);
    
    try {
      const genreMovies = await MovieService.getMoviesByGenre(genre);
      setMovies(genreMovies);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to load genre movies');
      setMovies([]);
    } finally {
      setLoading(false);
    }
  }, [loadPopularMovies]);

  const handleMovieClick = useCallback((movie: Movie) => {
    setSelectedMovie(movie);
    setIsModalOpen(true);
  }, []);

  const handleCloseModal = useCallback(() => {
    setIsModalOpen(false);
    setSelectedMovie(null);
  }, []);

  useEffect(() => {
    loadPopularMovies();
  }, [loadPopularMovies]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900">
      {/* Header */}
      <header className="bg-gray-900/95 backdrop-blur-sm border-b border-gray-800 sticky top-0 z-40">
        <div className="container mx-auto px-4 py-6">
          <div className="flex items-center justify-center mb-6">
            <div className="flex items-center gap-3">
              <div className="bg-red-600 p-2 rounded-full">
                <Film className="w-8 h-8 text-white" />
              </div>
              <h1 className="text-3xl font-bold text-white">
                Movie<span className="text-red-500">Explorer</span>
              </h1>
              <Popcorn className="w-6 h-6 text-yellow-400" />
            </div>
          </div>
          
          <SearchBar onSearch={handleSearch} />
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-8">
        {/* Page Title */}
        <div className="text-center mb-8">
          <h2 className="text-2xl font-bold text-white mb-2">
            {searchQuery 
              ? `Search Results for "${searchQuery}"` 
              : selectedGenre 
                ? `${selectedGenre.charAt(0).toUpperCase() + selectedGenre.slice(1)} Movies`
                : 'Popular Movies'
            }
          </h2>
          <p className="text-gray-400">
            Discover amazing movies and explore detailed information
          </p>
        </div>

        {/* Genre Filter */}
        <GenreFilter 
          selectedGenre={selectedGenre}
          onGenreSelect={handleGenreSelect}
        />

        {/* Movie Grid */}
        <MovieGrid
          movies={movies}
          loading={loading}
          error={error}
          onMovieClick={handleMovieClick}
        />
      </main>

      {/* Movie Detail Modal */}
      <MovieDetailModal
        movie={selectedMovie}
        isOpen={isModalOpen}
        onClose={handleCloseModal}
      />

      {/* Footer */}
      <footer className="bg-gray-900 border-t border-gray-800 mt-16">
        <div className="container mx-auto px-4 py-8 text-center">
          <p className="text-gray-400">
            Made with ❤️ using React & OMDb API
          </p>
        </div>
      </footer>
    </div>
  );
}

export default App;