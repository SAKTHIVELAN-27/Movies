import React, { useState, useEffect, useCallback } from "react";
import "./App.css";
import Sidebar from "./components/Sidebar";
import HeroBanner from "./components/HeroBanner";
import MovieCarousel from "./components/MovieCarousel";
import MovieForm from "./components/MovieForm";
import { getMovies, addMovie, updateMovie, deleteMovie, moods } from "./data/movies";
import { fetchMoviesByMood, fetchTrendingMovies } from "./services/movieApi";

function App() {
  const [apiMovies, setApiMovies] = useState({});
  const [localMovies, setLocalMovies] = useState([]);
  const [trendingMovies, setTrendingMovies] = useState([]);
  const [selectedMood, setSelectedMood] = useState(null);
  const [showForm, setShowForm] = useState(false);
  const [editingMovie, setEditingMovie] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

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
    if (moodId && !apiMovies[moodId]?.length) {
      loadMoodMovies(moodId);
    }
  };

  // Handle adding a new movie
  const handleAddMovie = () => {
    setEditingMovie(null);
    setShowForm(true);
  };

  // Handle editing a movie (only for local movies)
  const handleEditMovie = (movie) => {
    // Only allow editing local movies
    if (movie.tmdbId && !localMovies.find(m => m.id === movie.id)) {
      alert("You can only edit movies you've added locally.");
      return;
    }
    setEditingMovie(movie);
    setShowForm(true);
  };

  // Handle deleting a movie (only for local movies)
  const handleDeleteMovie = (id) => {
    // Check if it's a local movie
    if (!localMovies.find(m => m.id === id)) {
      alert("You can only delete movies you've added locally.");
      return;
    }
    if (window.confirm("Are you sure you want to delete this movie?")) {
      deleteMovie(id);
      setLocalMovies(getMovies());
    }
  };

  // Handle form save
  const handleSaveMovie = (movieData) => {
    if (editingMovie) {
      updateMovie(editingMovie.id, movieData);
    } else {
      addMovie(movieData);
    }
    setLocalMovies(getMovies());
    setShowForm(false);
    setEditingMovie(null);
  };

  // Handle form cancel
  const handleCancelForm = () => {
    setShowForm(false);
    setEditingMovie(null);
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

  return (
    <div className="min-h-screen bg-gray-900">
      {/* Sidebar */}
      <Sidebar
        selectedMood={selectedMood}
        onMoodSelect={handleMoodSelect}
        onAddClick={handleAddMovie}
      />

      {/* Main Content */}
      <div className="ml-20">
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

          {/* If mood selected, show filtered movies */}
          {selectedMood && !loading ? (
            <MovieCarousel
              title={`${currentMood?.emoji} Movies for ${currentMood?.name} Mood`}
              movies={getDisplayMovies(selectedMood)}
              moodId={selectedMood}
              onEdit={handleEditMovie}
              onDelete={handleDeleteMovie}
            />
          ) : !loading && (
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
                    onEdit={handleEditMovie}
                    onDelete={handleDeleteMovie}
                  />
                );
              })}

              {/* Your Added Movies */}
              {localMovies.length > 0 && (
                <MovieCarousel
                  title="Your Movies"
                  emoji="⭐"
                  movies={localMovies}
                  onEdit={handleEditMovie}
                  onDelete={handleDeleteMovie}
                />
              )}
            </>
          )}
        </main>

        {/* Footer */}
        <footer className="bg-gray-950 text-white py-8 mt-12 border-t border-gray-800">
          <div className="max-w-7xl mx-auto px-6 text-center">
            <div className="flex items-center justify-center gap-3 mb-4">
              <div className="w-10 h-10 bg-gradient-to-br from-purple-600 to-pink-500 rounded-xl flex items-center justify-center">
                <span className="text-white font-bold text-lg">M</span>
              </div>
              <span className="text-xl font-semibold">MooPo</span>
            </div>
            <p className="text-gray-400 text-sm">
              Your mood-based movie recommendation app
            </p>
            <p className="text-gray-500 text-xs mt-2">
              © 2026 MooPo. Built with React & Tailwind CSS.
            </p>
          </div>
        </footer>
      </div>

      {/* Movie Form Modal */}
      {showForm && (
        <MovieForm
          movie={editingMovie}
          onSave={handleSaveMovie}
          onCancel={handleCancelForm}
        />
      )}
    </div>
  );
}

export default App;
