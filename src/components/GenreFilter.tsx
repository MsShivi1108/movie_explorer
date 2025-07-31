import React from 'react';

interface GenreFilterProps {
  selectedGenre: string;
  onGenreSelect: (genre: string) => void;
}

const genres = [
  { id: '', name: 'All Movies' },
  { id: 'action', name: 'Action' },
  { id: 'comedy', name: 'Comedy' },
  { id: 'drama', name: 'Drama' },
  { id: 'horror', name: 'Horror' },
  { id: 'romance', name: 'Romance' },
  { id: 'sci-fi', name: 'Sci-Fi' },
  { id: 'thriller', name: 'Thriller' },
  { id: 'animation', name: 'Animation' }
];

export const GenreFilter: React.FC<GenreFilterProps> = ({ 
  selectedGenre, 
  onGenreSelect 
}) => {
  return (
    <div className="flex flex-wrap justify-center gap-2 mb-8">
      {genres.map((genre) => (
        <button
          key={genre.id}
          onClick={() => onGenreSelect(genre.id)}
          className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-200 transform hover:scale-105 ${
            selectedGenre === genre.id
              ? 'bg-red-600 text-white shadow-lg'
              : 'bg-gray-800 text-gray-300 hover:bg-gray-700 hover:text-white'
          }`}
        >
          {genre.name}
        </button>
      ))}
    </div>
  );
};