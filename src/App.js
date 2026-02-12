import React, { useState, useEffect } from "react";
import "./App.css";
import Sidebar from "./components/Sidebar";
import HeroBanner from "./components/HeroBanner";
import MovieCarousel from "./components/MovieCarousel";
import MovieForm from "./components/MovieForm";
import { getMovies, addMovie, updateMovie, deleteMovie, filterByMood, resetMovies, moods } from "./data/movies";

function App() {
  const [movies, setMovies] = useState([]);
  const [allMovies, setAllMovies] = useState([]);
  const [selectedMood, setSelectedMood] = useState(null);
  const [showForm, setShowForm] = useState(false);
  const [editingMovie, setEditingMovie] = useState(null);

  // Load movies on mount
  useEffect(() => {
    const storedMovies = getMovies();
    if (storedMovies.length > 0 && !storedMovies[0].moods) {
      const resetted = resetMovies();
      setMovies(resetted);
      setAllMovies(resetted);
    } else {
      setMovies(storedMovies);
      setAllMovies(storedMovies);
    }
  }, []);

  // Filter movies when mood changes
  useEffect(() => {
    if (selectedMood) {
      setMovies(filterByMood(selectedMood));
    } else {
      setMovies(getMovies());
    }
  }, [selectedMood]);

  // Handle mood selection
  const handleMoodSelect = (moodId) => {
    setSelectedMood(moodId);
  };

  // Handle adding a new movie
  const handleAddMovie = () => {
    setEditingMovie(null);
    setShowForm(true);
  };

  // Handle editing a movie
  const handleEditMovie = (movie) => {
    setEditingMovie(movie);
    setShowForm(true);
  };

  // Handle deleting a movie
  const handleDeleteMovie = (id) => {
    if (window.confirm("Are you sure you want to delete this movie?")) {
      deleteMovie(id);
      const updated = getMovies();
      setAllMovies(updated);
      if (selectedMood) {
        setMovies(filterByMood(selectedMood));
      } else {
        setMovies(updated);
      }
    }
  };

  // Handle form save
  const handleSaveMovie = (movieData) => {
    if (editingMovie) {
      updateMovie(editingMovie.id, movieData);
    } else {
      addMovie(movieData);
    }
    const updated = getMovies();
    setAllMovies(updated);
    if (selectedMood) {
      setMovies(filterByMood(selectedMood));
    } else {
      setMovies(updated);
    }
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

  // Group movies by mood for recommendations
  const getMoviesByMood = (moodId) => {
    return allMovies.filter(m => m.moods && m.moods.includes(moodId));
  };

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
        <HeroBanner movies={movies} currentMood={selectedMood} />

        {/* Content Area */}
        <main className="py-8 -mt-20 relative z-10">
          {/* If mood selected, show filtered movies */}
          {selectedMood ? (
            <MovieCarousel
              title={`${currentMood?.emoji} Movies for ${currentMood?.name} Mood`}
              movies={movies}
              moodId={selectedMood}
              onEdit={handleEditMovie}
              onDelete={handleDeleteMovie}
            />
          ) : (
            <>
              {/* Show carousels for each mood category */}
              {moods.map((mood) => {
                const moodMovies = getMoviesByMood(mood.id);
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

              {/* All Movies */}
              <MovieCarousel
                title="All Movies"
                emoji="🎬"
                movies={allMovies}
                onEdit={handleEditMovie}
                onDelete={handleDeleteMovie}
              />
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
