export interface Movie {
  imdbID: string;
  Title: string;
  Year: string;
  Type: string;
  Poster: string;
  Plot?: string;
  Director?: string;
  Writer?: string;
  Actors?: string;
  Genre?: string;
  Runtime?: string;
  Released?: string;
  imdbRating?: string;
  Country?: string;
  Language?: string;
  Awards?: string;
}

export interface SearchResponse {
  Search: Movie[];
  totalResults: string;
  Response: string;
  Error?: string;
}

export interface MovieDetail extends Movie {
  Rated?: string;
  Metascore?: string;
  BoxOffice?: string;
  Production?: string;
  Website?: string;
}