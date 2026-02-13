import React, { useState, useEffect, useCallback } from "react";
import "./App.css";
import Sidebar from "./components/Sidebar";
import HeroBanner from "./components/HeroBanner";
import MovieCarousel from "./components/MovieCarousel";
import { getMovies, moods } from "./data/movies";
import { fetchMoviesByMood, fetchTrendingMovies, searchMovies } from "./services/movieApi";

function App() {
  const [apiMovies, setApiMovies] = useState({});
  const [localMovies, setLocalMovies] = useState([]);
  const [trendingMovies, setTrendingMovies] = useState([]);
  const [selectedMood, setSelectedMood] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [activeSection, setActiveSection] = useState("home");
  const [customMoodText, setCustomMoodText] = useState("");
  const [customMoodMovies, setCustomMoodMovies] = useState([]);
  const [favorites, setFavorites] = useState(() => {
    const saved = localStorage.getItem("moopo_favorites");
    return saved ? JSON.parse(saved) : [];
  });
  const [watchlist, setWatchlist] = useState(() => {
    const saved = localStorage.getItem("moopo_watchlist");
    return saved ? JSON.parse(saved) : [];
  });

  // Save favorites to localStorage
  useEffect(() => {
    localStorage.setItem("moopo_favorites", JSON.stringify(favorites));
  }, [favorites]);

  // Save watchlist to localStorage
  useEffect(() => {
    localStorage.setItem("moopo_watchlist", JSON.stringify(watchlist));
  }, [watchlist]);

  // Toggle favorite
  const toggleFavorite = (movie) => {
    setFavorites(prev => {
      const exists = prev.find(m => m.id === movie.id || (m.tmdbId && m.tmdbId === movie.tmdbId));
      if (exists) {
        return prev.filter(m => m.id !== movie.id && m.tmdbId !== movie.tmdbId);
      }
      return [...prev, movie];
    });
  };

  // Toggle watchlist
  const toggleWatchlist = (movie) => {
    setWatchlist(prev => {
      const exists = prev.find(m => m.id === movie.id || (m.tmdbId && m.tmdbId === movie.tmdbId));
      if (exists) {
        return prev.filter(m => m.id !== movie.id && m.tmdbId !== movie.tmdbId);
      }
      return [...prev, movie];
    });
  };

  // Check if movie is favorited
  const isFavorite = (movie) => {
    return favorites.some(m => m.id === movie.id || (m.tmdbId && m.tmdbId === movie.tmdbId));
  };

  // Check if movie is in watchlist
  const isInWatchlist = (movie) => {
    return watchlist.some(m => m.id === movie.id || (m.tmdbId && m.tmdbId === movie.tmdbId));
  };

  // Fetch movies from API on mount
  const loadMovies = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      // Fetch trending movies for hero banner
      const trending = await fetchTrendingMovies("week");
      setTrendingMovies(trending.slice(0, 5));

      // Fetch movies for each mood
      const moodMoviesData = {};
      for (const mood of moods) {
        const movies = await fetchMoviesByMood(mood.id);
        moodMoviesData[mood.id] = movies.slice(0, 10);
      }
      setApiMovies(moodMoviesData);

      // Load local/custom movies
      setLocalMovies(getMovies());
    } catch (err) {
      console.error("Error loading movies:", err);
      setError("Failed to load movies. Please try again.");
      // Fallback to local movies
      setLocalMovies(getMovies());
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    loadMovies();
  }, [loadMovies]);

  // Fetch movies when mood changes
  const loadMoodMovies = useCallback(async (moodId) => {
    if (!moodId) return;
    setLoading(true);
    try {
      const movies = await fetchMoviesByMood(moodId);
      setApiMovies(prev => ({
        ...prev,
        [moodId]: movies,
      }));
    } catch (err) {
      console.error("Error loading mood movies:", err);
    } finally {
      setLoading(false);
    }
  }, []);

  // Handle mood selection
  const handleMoodSelect = (moodId) => {
    setSelectedMood(moodId);
    setCustomMoodText(""); // Clear custom mood when selecting preset
    setCustomMoodMovies([]);
    if (moodId && !apiMovies[moodId]?.length) {
      loadMoodMovies(moodId);
    }
  };

  // Handle custom mood search
  const handleCustomMoodSearch = async (moodText) => {
    setLoading(true);
    setSelectedMood(null);
    setActiveSection("home");
    setCustomMoodText(moodText);
    
    try {
      const lowerMood = moodText.toLowerCase().trim();
      
      // Check if it matches a predefined mood - use genre-based API for better results
      const predefinedMoods = ["happy", "sad", "excited", "relaxed", "romantic", "adventurous", "scared", "thoughtful"];
      if (predefinedMoods.includes(lowerMood)) {
        const movies = await fetchMoviesByMood(lowerMood);
        setCustomMoodMovies(movies);
        setLoading(false);
        return;
      }

      // Map common mood words to predefined moods for better results
      const moodMapping = {
        "joyful": "happy", "cheerful": "happy", "fun": "happy", "funny": "happy", "comedy": "happy",
        "depressed": "sad", "emotional": "sad", "crying": "sad", "tearful": "sad", "melancholy": "sad",
        "thrilled": "excited", "pumped": "excited", "hyped": "excited", "action": "excited", "intense": "excited",
        "calm": "relaxed", "peaceful": "relaxed", "chill": "relaxed", "mellow": "relaxed", "cozy": "relaxed",
        "love": "romantic", "lovey": "romantic", "crush": "romantic", "date": "romantic", "valentine": "romantic",
        "adventure": "adventurous", "exploring": "adventurous", "journey": "adventurous", "quest": "adventurous",
        "horror": "scared", "scary": "scared", "terrified": "scared", "spooky": "scared", "creepy": "scared",
        "thinking": "thoughtful", "philosophical": "thoughtful", "deep": "thoughtful", "mindful": "thoughtful",
        // Additional moods
        "angry": "excited", "rage": "excited", "mad": "excited",
        "nostalgic": "sad", "sentimental": "sad",
        "inspired": "thoughtful", "motivated": "thoughtful",
        "curious": "thoughtful", "intrigued": "thoughtful",
        "lonely": "sad", "alone": "sad",
        "hopeful": "happy", "optimistic": "happy",
        "bored": "excited", "entertainment": "excited",
        "stressed": "relaxed", "anxious": "relaxed", "tired": "relaxed",
        "energetic": "excited", "hyper": "excited", "active": "excited",
        "playful": "happy", "silly": "happy",
        "mysterious": "scared", "suspense": "scared", "thriller": "scared",
      };

      // Check if typed mood maps to a predefined mood
      if (moodMapping[lowerMood]) {
        const movies = await fetchMoviesByMood(moodMapping[lowerMood]);
        setCustomMoodMovies(movies);
        setLoading(false);
        return;
      }

      // Fall back to search API for unknown moods
      const movies = await searchMovies(moodText);
      setCustomMoodMovies(movies);
    } catch (err) {
      console.error("Error searching custom mood:", err);
      setError("Failed to search movies for your mood.");
    } finally {
      setLoading(false);
    }
  };

  // Get current mood info
  const currentMood = selectedMood ? moods.find(m => m.id === selectedMood) : null;

  // Get movies for display (combining API and local)
  const getDisplayMovies = (moodId) => {
    const apiMoodMovies = apiMovies[moodId] || [];
    const localMoodMovies = localMovies.filter(m => m.moods?.includes(moodId));
    return [...localMoodMovies, ...apiMoodMovies];
  };

  // All movies for hero banner
  const heroMovies = trendingMovies.length > 0 ? trendingMovies : localMovies.slice(0, 5);

  // Handle section change
  const handleSectionChange = (section) => {
    setActiveSection(section);
    setCustomMoodText("");
    setCustomMoodMovies([]);
  };

  // Get section title
  const getSectionTitle = () => {
    switch (activeSection) {
      case "favorites": return "❤️ Your Favorites";
      case "watchlist": return "🔖 Your Watchlist";
      case "tvshows": return "📺 TV Shows";
      case "movies": return "🎬 All Movies";
      default: return null;
    }
  };

  return (
    <div className="min-h-screen bg-gray-900 overflow-x-hidden scrollbar-hide">
      {/* Sidebar */}
      <Sidebar
        selectedMood={selectedMood}
        onMoodSelect={handleMoodSelect}
        activeSection={activeSection}
        onSectionChange={handleSectionChange}
        onCustomMoodSearch={handleCustomMoodSearch}
        customMoodText={customMoodText}
      />

      {/* Main Content */}
      <div className="ml-56">
        {/* Hero Banner */}
        <HeroBanner movies={heroMovies} currentMood={selectedMood} />

        {/* Content Area */}
        <main className="py-8 -mt-20 relative z-10">
          {/* Loading State */}
          {loading && (
            <div className="flex items-center justify-center py-12">
              <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-purple-500"></div>
              <span className="ml-4 text-white text-lg">Loading movies...</span>
            </div>
          )}

          {/* Error State */}
          {error && (
            <div className="mx-6 mb-6 p-4 bg-red-900/50 border border-red-500 rounded-lg text-red-200">
              <p className="font-medium">Error loading movies</p>
              <p className="text-sm text-red-300">{error}</p>
            </div>
          )}

          {/* Favorites Section */}
          {activeSection === "favorites" && !selectedMood && !loading && (
            <div className="px-6">
              <h2 className="text-2xl font-bold text-white mb-6">{getSectionTitle()}</h2>
              {favorites.length > 0 ? (
                <MovieCarousel
                  title=""
                  movies={favorites}
                  onFavorite={toggleFavorite}
                  onWatchlist={toggleWatchlist}
                  isFavorite={isFavorite}
                  isInWatchlist={isInWatchlist}
                />
              ) : (
                <div className="text-center py-16">
                  <span className="text-6xl mb-4 block">❤️</span>
                  <p className="text-white text-lg font-medium">No favorites yet</p>
                  <p className="text-gray-300 text-sm mt-2">Click the heart icon on any movie to add it here</p>
                </div>
              )}
            </div>
          )}

          {/* Watchlist Section */}
          {activeSection === "watchlist" && !selectedMood && !loading && (
            <div className="px-6">
              <h2 className="text-2xl font-bold text-white mb-6">{getSectionTitle()}</h2>
              {watchlist.length > 0 ? (
                <MovieCarousel
                  title=""
                  movies={watchlist}
                  onFavorite={toggleFavorite}
                  onWatchlist={toggleWatchlist}
                  isFavorite={isFavorite}
                  isInWatchlist={isInWatchlist}
                />
              ) : (
                <div className="text-center py-16">
                  <span className="text-6xl mb-4 block">🔖</span>
                  <p className="text-white text-lg font-medium">Your watchlist is empty</p>
                  <p className="text-gray-300 text-sm mt-2">Click the bookmark icon on any movie to watch later</p>
                </div>
              )}
            </div>
          )}

          {/* TV Shows Section */}
          {activeSection === "tvshows" && !selectedMood && !loading && (
            <div className="px-6">
              <h2 className="text-2xl font-bold text-white mb-6">{getSectionTitle()}</h2>
              <div className="text-center py-16">
                <span className="text-6xl mb-4 block">📺</span>
                <p className="text-white text-lg font-medium">Coming Soon!</p>
                <p className="text-cyan-300 text-sm mt-2">TV Shows feature will be available soon</p>
              </div>
            </div>
          )}

          {/* Custom Mood Search Results */}
          {customMoodText && !selectedMood && !loading && (
            <div className="px-6">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-bold text-white">
                  🎭 Movies for "{customMoodText}" mood
                  <span className="text-gray-500 text-base font-normal ml-2">({customMoodMovies.length})</span>
                </h2>
                <button
                  onClick={() => {
                    setCustomMoodText("");
                    setCustomMoodMovies([]);
                  }}
                  className="text-gray-400 hover:text-white text-sm flex items-center gap-1"
                >
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                  Clear
                </button>
              </div>
              {customMoodMovies.length > 0 ? (
                <MovieCarousel
                  title=""
                  movies={customMoodMovies}
                  onFavorite={toggleFavorite}
                  onWatchlist={toggleWatchlist}
                  isFavorite={isFavorite}
                  isInWatchlist={isInWatchlist}
                />
              ) : (
                <div className="text-center py-16">
                  <span className="text-6xl mb-4 block">🔍</span>
                  <p className="text-gray-400 text-lg">No movies found for "{customMoodText}"</p>
                  <p className="text-gray-500 text-sm mt-2">Try a different mood or browse our categories</p>
                </div>
              )}
            </div>
          )}

          {/* If mood selected, show filtered movies */}
          {selectedMood && !loading ? (
            <MovieCarousel
              title={`${currentMood?.emoji} Movies for ${currentMood?.name} Mood`}
              movies={getDisplayMovies(selectedMood)}
              moodId={selectedMood}
              onFavorite={toggleFavorite}
              onWatchlist={toggleWatchlist}
              isFavorite={isFavorite}
              isInWatchlist={isInWatchlist}
            />
          ) : (activeSection === "home" || activeSection === "movies") && !loading && !customMoodText && (
            <>
              {/* Show carousels for each mood category from API */}
              {moods.map((mood) => {
                const moodMovies = getDisplayMovies(mood.id);
                if (moodMovies.length === 0) return null;
                return (
                  <MovieCarousel
                    key={mood.id}
                    title={`${mood.name} Mood`}
                    emoji={mood.emoji}
                    movies={moodMovies}
                    moodId={mood.id}
                    onFavorite={toggleFavorite}
                    onWatchlist={toggleWatchlist}
                    isFavorite={isFavorite}
                    isInWatchlist={isInWatchlist}
                  />
                );
              })}
            </>
          )}
        </main>

        {/* Footer */}
        <footer className="bg-gray-950 text-white py-8 mt-12 border-t border-gray-800">
          <div className="max-w-7xl mx-auto px-6 text-center">
            <div className="flex items-center justify-center gap-3 mb-4">
              <div className="w-10 h-10 bg-gradient-to-br from-cyan-500 to-blue-600 rounded-xl flex items-center justify-center shadow-lg shadow-cyan-500/30">
                <span className="text-white font-bold text-lg">M</span>
              </div>
              <div className="flex flex-col items-start">
                <span className="text-xl font-semibold leading-tight">Mood</span>
                <span className="text-white font-semibold text-sm leading-tight">Player</span>
              </div>
            </div>
            <p className="text-gray-400 text-sm">
              Your mood-based movie recommendation app
            </p>
            <p className="text-gray-500 text-xs mt-2">
              © 2026 Mood Player. Built with React & Tailwind CSS.
            </p>
          </div>
        </footer>
      </div>
    </div>
  );
}

export default App;
