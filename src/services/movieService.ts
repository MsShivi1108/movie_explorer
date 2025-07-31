const API_KEY = '96b63711'; // OMDb API key
const BASE_URL = 'https://www.omdbapi.com/';

export class MovieService {
  private static async fetchFromAPI(params: Record<string, string>) {
    const url = new URL(BASE_URL);
    url.searchParams.append('apikey', API_KEY);
    
    Object.entries(params).forEach(([key, value]) => {
      url.searchParams.append(key, value);
    });

    try {
      const response = await fetch(url.toString());
      const data = await response.json();
      
      if (data.Response === 'False') {
        throw new Error(data.Error || 'API request failed');
      }
      
      return data;
    } catch (error) {
      console.error('API Error:', error);
      throw error;
    }
  }

  static async searchMovies(query: string, page: number = 1): Promise<SearchResponse> {
    return this.fetchFromAPI({
      s: query,
      page: page.toString(),
    });
  }

  static async getMovieDetails(imdbID: string): Promise<MovieDetail> {
    return this.fetchFromAPI({
      i: imdbID,
      plot: 'full'
    });
  }

  static async getPopularMovies(): Promise<Movie[]> {
    // Search for popular movie titles to display on homepage
    const popularTitles = [
      'Avengers', 'Batman', 'Spider-Man', 'Star Wars', 'Harry Potter',
      'Marvel', 'Fast', 'Mission Impossible', 'James Bond', 'Jurassic'
    ];
    
    const allMovies: Movie[] = [];
    
    for (const title of popularTitles.slice(0, 4)) {
      try {
        const result = await this.searchMovies(title, 1);
        if (result.Search) {
          allMovies.push(...result.Search.slice(0, 3));
        }
        // Add small delay to avoid rate limiting
        await new Promise(resolve => setTimeout(resolve, 100));
      } catch (error) {
        console.error(`Error fetching ${title} movies:`, error);
      }
    }
    
    // Remove duplicates and return unique movies
    const uniqueMovies = allMovies.filter((movie, index, self) => 
      index === self.findIndex(m => m.imdbID === movie.imdbID)
    );
    
    return uniqueMovies.slice(0, 20);
  }

  static async getMoviesByGenre(genre: string): Promise<Movie[]> {
    try {
      const result = await this.searchMovies(genre, 1);
      return result.Search || [];
    } catch (error) {
      console.error(`Error fetching ${genre} movies:`, error);
      return [];
    }
  }
}