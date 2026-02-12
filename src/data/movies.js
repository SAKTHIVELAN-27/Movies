// Mock movie data for frontend-only application
// Data persists using localStorage

// Mood definitions with emoji and colors
export const moods = [
  { id: "happy", name: "Happy", emoji: "😊", color: "from-yellow-400 to-orange-400", description: "Feel-good movies to lift your spirits" },
  { id: "sad", name: "Sad", emoji: "😢", color: "from-blue-400 to-indigo-500", description: "When you need a good cry" },
  { id: "excited", name: "Excited", emoji: "🤩", color: "from-red-500 to-pink-500", description: "Action-packed thrillers" },
  { id: "relaxed", name: "Relaxed", emoji: "😌", color: "from-green-400 to-teal-500", description: "Calm and peaceful viewing" },
  { id: "romantic", name: "Romantic", emoji: "💕", color: "from-pink-400 to-rose-500", description: "Love stories for the heart" },
  { id: "adventurous", name: "Adventurous", emoji: "🚀", color: "from-purple-500 to-indigo-600", description: "Epic journeys and discoveries" },
  { id: "scared", name: "Scared", emoji: "😱", color: "from-gray-700 to-gray-900", description: "Horror and suspense" },
  { id: "thoughtful", name: "Thoughtful", emoji: "🤔", color: "from-cyan-500 to-blue-600", description: "Mind-bending experiences" },
];

const initialMovies = [
  {
    id: 1,
    title: "Inception",
    genre: "Sci-Fi",
    year: 2010,
    rating: 8.8,
    description: "A thief who steals corporate secrets through the use of dream-sharing technology.",
    poster: "https://images.unsplash.com/photo-1536440136628-849c177e76a1?w=300&h=450&fit=crop",
    moods: ["thoughtful", "excited", "adventurous"],
  },
  {
    id: 2,
    title: "The Dark Knight",
    genre: "Action",
    year: 2008,
    rating: 9.0,
    description: "When the menace known as the Joker wreaks havoc on Gotham, Batman must face his greatest challenge.",
    poster: "https://images.unsplash.com/photo-1509347528160-9a9e33742cdb?w=300&h=450&fit=crop",
    moods: ["excited", "thoughtful", "scared"],
  },
  {
    id: 3,
    title: "Interstellar",
    genre: "Sci-Fi",
    year: 2014,
    rating: 8.6,
    description: "A team of explorers travel through a wormhole in space to ensure humanity's survival.",
    poster: "https://images.unsplash.com/photo-1446776811953-b23d57bd21aa?w=300&h=450&fit=crop",
    moods: ["adventurous", "thoughtful", "sad"],
  },
  {
    id: 4,
    title: "The Shawshank Redemption",
    genre: "Drama",
    year: 1994,
    rating: 9.3,
    description: "Two imprisoned men bond over a number of years, finding solace and eventual redemption.",
    poster: "https://images.unsplash.com/photo-1485846234645-a62644f84728?w=300&h=450&fit=crop",
    moods: ["sad", "thoughtful", "happy"],
  },
  {
    id: 5,
    title: "Pulp Fiction",
    genre: "Crime",
    year: 1994,
    rating: 8.9,
    description: "The lives of two mob hitmen, a boxer, and a pair of diner bandits intertwine.",
    poster: "https://images.unsplash.com/photo-1440404653325-ab127d49abc1?w=300&h=450&fit=crop",
    moods: ["excited", "thoughtful"],
  },
  {
    id: 6,
    title: "The Matrix",
    genre: "Sci-Fi",
    year: 1999,
    rating: 8.7,
    description: "A computer hacker learns about the true nature of reality and his role in the war against its controllers.",
    poster: "https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?w=300&h=450&fit=crop",
    moods: ["excited", "adventurous", "thoughtful"],
  },
  {
    id: 7,
    title: "The Notebook",
    genre: "Romance",
    year: 2004,
    rating: 7.8,
    description: "A poor yet passionate young man falls in love with a rich young woman and gives her a sense of freedom.",
    poster: "https://images.unsplash.com/photo-1518199266791-5375a83190b7?w=300&h=450&fit=crop",
    moods: ["romantic", "sad", "happy"],
  },
  {
    id: 8,
    title: "The Conjuring",
    genre: "Horror",
    year: 2013,
    rating: 7.5,
    description: "Paranormal investigators Ed and Lorraine Warren work to help a family terrorized by a dark presence.",
    poster: "https://images.unsplash.com/photo-1601513445506-2ab0d4fb4229?w=300&h=450&fit=crop",
    moods: ["scared", "excited"],
  },
  {
    id: 9,
    title: "Forrest Gump",
    genre: "Drama",
    year: 1994,
    rating: 8.8,
    description: "The presidencies of Kennedy and Johnson through the eyes of an Alabama man with an IQ of 75.",
    poster: "https://images.unsplash.com/photo-1489599849927-2ee91cede3ba?w=300&h=450&fit=crop",
    moods: ["happy", "sad", "thoughtful"],
  },
  {
    id: 10,
    title: "Finding Nemo",
    genre: "Animation",
    year: 2003,
    rating: 8.2,
    description: "A clownfish father journeys across the ocean to find his captured son.",
    poster: "https://images.unsplash.com/photo-1544551763-46a013bb70d5?w=300&h=450&fit=crop",
    moods: ["happy", "adventurous", "relaxed"],
  },
  {
    id: 11,
    title: "La La Land",
    genre: "Musical",
    year: 2016,
    rating: 8.0,
    description: "A jazz musician and an aspiring actress fall in love while pursuing their dreams in Los Angeles.",
    poster: "https://images.unsplash.com/photo-1514306191717-452ec28c7814?w=300&h=450&fit=crop",
    moods: ["romantic", "happy", "sad"],
  },
  {
    id: 12,
    title: "Get Out",
    genre: "Horror",
    year: 2017,
    rating: 7.7,
    description: "A young African-American visits his white girlfriend's parents for the weekend, where his simmering uneasiness turns to terror.",
    poster: "https://images.unsplash.com/photo-1509248961725-9d3c0c8a81ec?w=300&h=450&fit=crop",
    moods: ["scared", "thoughtful", "excited"],
  },
];

// Get movies from localStorage or use initial data
export const getMovies = () => {
  const stored = localStorage.getItem("movies");
  if (stored) {
    const movies = JSON.parse(stored);
    // Ensure all movies have moods array
    return movies.map(m => ({
      ...m,
      moods: m.moods || ["happy"]
    }));
  }
  localStorage.setItem("movies", JSON.stringify(initialMovies));
  return initialMovies;
};

// Save movies to localStorage
export const saveMovies = (movies) => {
  localStorage.setItem("movies", JSON.stringify(movies));
};

// Reset to initial movies (with moods)
export const resetMovies = () => {
  localStorage.setItem("movies", JSON.stringify(initialMovies));
  return initialMovies;
};

// Add a new movie
export const addMovie = (movie) => {
  const movies = getMovies();
  const newMovie = {
    ...movie,
    id: Date.now(),
    moods: movie.moods || ["happy"],
  };
  movies.push(newMovie);
  saveMovies(movies);
  return movies;
};

// Update a movie
export const updateMovie = (id, updatedMovie) => {
  const movies = getMovies();
  const index = movies.findIndex((m) => m.id === id);
  if (index !== -1) {
    movies[index] = { ...movies[index], ...updatedMovie };
    saveMovies(movies);
  }
  return movies;
};

// Delete a movie
export const deleteMovie = (id) => {
  const movies = getMovies().filter((m) => m.id !== id);
  saveMovies(movies);
  return movies;
};

// Search movies
export const searchMovies = (query) => {
  const movies = getMovies();
  if (!query) return movies;
  const lowerQuery = query.toLowerCase();
  return movies.filter(
    (m) =>
      m.title.toLowerCase().includes(lowerQuery) ||
      m.genre.toLowerCase().includes(lowerQuery)
  );
};

// Filter movies by mood
export const filterByMood = (moodId) => {
  const movies = getMovies();
  if (!moodId) return movies;
  return movies.filter((m) => m.moods && m.moods.includes(moodId));
};

// Get mood recommendations based on user's current mood
export const getMoodRecommendations = (moodId, limit = 6) => {
  const movies = filterByMood(moodId);
  // Sort by rating and return top movies
  return movies.sort((a, b) => b.rating - a.rating).slice(0, limit);
};

export default initialMovies;
