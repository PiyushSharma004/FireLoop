const TMDB_API_KEY = "1a2b3261a20c9a5650f3e890b8c8668c"
const TMDB_BASE_URL = "https://api.themoviedb.org/3"
const TMDB_IMAGE_BASE_URL = "https://image.tmdb.org/t/p/w500"

export interface TMDBMovie {
  id: number
  title: string
  overview: string
  poster_path: string
  backdrop_path: string
  release_date: string
  vote_average: number
  genre_ids: number[]
  popularity: number
}

export interface TMDBGenre {
  id: number
  name: string
}

export const tmdbApi = {
  // Get trending movies
  getTrending: async (): Promise<TMDBMovie[]> => {
    try {
      const response = await fetch(`${TMDB_BASE_URL}/trending/movie/week?api_key=${TMDB_API_KEY}`)
      const data = await response.json()
      return data.results || []
    } catch (error) {
      console.error("Error fetching trending movies:", error)
      return []
    }
  },

  // Get popular movies
  getPopular: async (): Promise<TMDBMovie[]> => {
    try {
      const response = await fetch(`${TMDB_BASE_URL}/movie/popular?api_key=${TMDB_API_KEY}`)
      const data = await response.json()
      return data.results || []
    } catch (error) {
      console.error("Error fetching popular movies:", error)
      return []
    }
  },

  // Get top rated movies
  getTopRated: async (): Promise<TMDBMovie[]> => {
    try {
      const response = await fetch(`${TMDB_BASE_URL}/movie/top_rated?api_key=${TMDB_API_KEY}`)
      const data = await response.json()
      return data.results || []
    } catch (error) {
      console.error("Error fetching top rated movies:", error)
      return []
    }
  },

  // Search movies
  searchMovies: async (query: string): Promise<TMDBMovie[]> => {
    try {
      const response = await fetch(
        `${TMDB_BASE_URL}/search/movie?api_key=${TMDB_API_KEY}&query=${encodeURIComponent(query)}`,
      )
      const data = await response.json()
      return data.results || []
    } catch (error) {
      console.error("Error searching movies:", error)
      return []
    }
  },

  // Get movie details
  getMovieDetails: async (movieId: number) => {
    try {
      const response = await fetch(`${TMDB_BASE_URL}/movie/${movieId}?api_key=${TMDB_API_KEY}`)
      return await response.json()
    } catch (error) {
      console.error("Error fetching movie details:", error)
      return null
    }
  },

  // Get genres
  getGenres: async (): Promise<TMDBGenre[]> => {
    try {
      const response = await fetch(`${TMDB_BASE_URL}/genre/movie/list?api_key=${TMDB_API_KEY}`)
      const data = await response.json()
      return data.genres || []
    } catch (error) {
      console.error("Error fetching genres:", error)
      return []
    }
  },

  // Get movies by genre
  getMoviesByGenre: async (genreId: number): Promise<TMDBMovie[]> => {
    try {
      const response = await fetch(`${TMDB_BASE_URL}/discover/movie?api_key=${TMDB_API_KEY}&with_genres=${genreId}`)
      const data = await response.json()
      return data.results || []
    } catch (error) {
      console.error("Error fetching movies by genre:", error)
      return []
    }
  },

  // Get image URL
  getImageUrl: (path: string, size = "w500"): string => {
    if (!path) return "/placeholder.svg?height=300&width=200"
    return `https://image.tmdb.org/t/p/${size}${path}`
  },

  // Get backdrop URL
  getBackdropUrl: (path: string, size = "w1280"): string => {
    if (!path) return "/placeholder.svg?height=600&width=1200"
    return `https://image.tmdb.org/t/p/${size}${path}`
  },
}
