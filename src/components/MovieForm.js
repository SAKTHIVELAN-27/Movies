import React, { useState, useEffect } from "react";
import { moods } from "../data/movies";

const MovieForm = ({ movie, onSave, onCancel }) => {
  const [formData, setFormData] = useState({
    title: "",
    genre: "",
    year: new Date().getFullYear(),
    rating: 5.0,
    description: "",
    poster: "https://images.unsplash.com/photo-1536440136628-849c177e76a1?w=300&h=450&fit=crop",
    moods: [],
  });

  const genres = ["Action", "Comedy", "Drama", "Horror", "Sci-Fi", "Romance", "Thriller", "Crime", "Animation", "Musical"];

  useEffect(() => {
    if (movie) {
      setFormData({
        ...movie,
        moods: movie.moods || [],
      });
    }
  }, [movie]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: name === "year" || name === "rating" ? Number(value) : value,
    }));
  };

  const handleMoodToggle = (moodId) => {
    setFormData((prev) => ({
      ...prev,
      moods: prev.moods.includes(moodId)
        ? prev.moods.filter((m) => m !== moodId)
        : [...prev.moods, moodId],
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (formData.moods.length === 0) {
      alert("Please select at least one mood for this movie");
      return;
    }
    onSave(formData);
  };

  return (
    <div className="fixed inset-0 bg-black/80 backdrop-blur-sm flex items-center justify-center z-[100] p-4 animate-fade-in">
      <div className="bg-gray-900 border border-gray-800 rounded-2xl shadow-2xl w-full max-w-lg max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="bg-gradient-to-r from-purple-600 to-pink-600 p-6 rounded-t-2xl">
          <h2 className="font-poppins font-semibold text-2xl text-white">
            {movie ? "Edit Movie" : "Add New Movie"}
          </h2>
          <p className="font-poppins text-white/80 text-sm mt-1">
            {movie ? "Update movie details" : "Fill in the movie details below"}
          </p>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="p-6 space-y-5">
          {/* Title */}
          <div>
            <label className="block font-poppins font-medium text-gray-300 mb-2">
              Movie Title
            </label>
            <input
              type="text"
              name="title"
              value={formData.title}
              onChange={handleChange}
              required
              className="w-full px-4 py-3 bg-gray-800 border-2 border-gray-700 rounded-xl font-poppins text-white placeholder-gray-500 focus:border-purple-500 focus:outline-none transition-colors"
              placeholder="Enter movie title"
            />
          </div>

          {/* Genre */}
          <div>
            <label className="block font-poppins font-medium text-gray-300 mb-2">
              Genre
            </label>
            <select
              name="genre"
              value={formData.genre}
              onChange={handleChange}
              required
              className="w-full px-4 py-3 bg-gray-800 border-2 border-gray-700 rounded-xl font-poppins text-white focus:border-purple-500 focus:outline-none transition-colors"
            >
              <option value="">Select a genre</option>
              {genres.map((g) => (
                <option key={g} value={g}>{g}</option>
              ))}
            </select>
          </div>

          {/* Year & Rating */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block font-poppins font-medium text-gray-300 mb-2">
                Year
              </label>
              <input
                type="number"
                name="year"
                value={formData.year}
                onChange={handleChange}
                min="1900"
                max={new Date().getFullYear() + 5}
                required
                className="w-full px-4 py-3 bg-gray-800 border-2 border-gray-700 rounded-xl font-poppins text-white focus:border-purple-500 focus:outline-none transition-colors"
              />
            </div>
            <div>
              <label className="block font-poppins font-medium text-gray-300 mb-2">
                Rating
              </label>
              <input
                type="number"
                name="rating"
                value={formData.rating}
                onChange={handleChange}
                min="0"
                max="10"
                step="0.1"
                required
                className="w-full px-4 py-3 bg-gray-800 border-2 border-gray-700 rounded-xl font-poppins text-white focus:border-purple-500 focus:outline-none transition-colors"
              />
            </div>
          </div>

          {/* Moods Selection */}
          <div>
            <label className="block font-poppins font-medium text-gray-300 mb-2">
              Recommended Moods <span className="text-gray-500 text-sm">(select all that apply)</span>
            </label>
            <div className="grid grid-cols-4 gap-2">
              {moods.map((mood) => (
                <button
                  key={mood.id}
                  type="button"
                  onClick={() => handleMoodToggle(mood.id)}
                  className={`p-2 rounded-xl transition-all duration-200 flex flex-col items-center ${
                    formData.moods.includes(mood.id)
                      ? `bg-gradient-to-br ${mood.color} text-white shadow-md scale-105`
                      : "bg-gray-800 hover:bg-gray-700 text-gray-300"
                  }`}
                >
                  <span className="text-xl">{mood.emoji}</span>
                  <span className="text-xs font-medium mt-1">{mood.name}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Description */}
          <div>
            <label className="block font-poppins font-medium text-gray-300 mb-2">
              Description
            </label>
            <textarea
              name="description"
              value={formData.description}
              onChange={handleChange}
              rows={3}
              required
              className="w-full px-4 py-3 bg-gray-800 border-2 border-gray-700 rounded-xl font-poppins text-white placeholder-gray-500 focus:border-purple-500 focus:outline-none transition-colors resize-none"
              placeholder="Enter movie description"
            />
          </div>

          {/* Poster URL */}
          <div>
            <label className="block font-poppins font-medium text-gray-300 mb-2">
              Poster URL
            </label>
            <input
              type="url"
              name="poster"
              value={formData.poster}
              onChange={handleChange}
              className="w-full px-4 py-3 bg-gray-800 border-2 border-gray-700 rounded-xl font-poppins text-white placeholder-gray-500 focus:border-purple-500 focus:outline-none transition-colors"
              placeholder="https://example.com/poster.jpg"
            />
          </div>

          {/* Buttons */}
          <div className="flex gap-4 pt-4">
            <button
              type="button"
              onClick={onCancel}
              className="flex-1 bg-gray-700 text-gray-300 font-poppins font-semibold py-3 px-6 rounded-xl hover:bg-gray-600 transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="flex-1 bg-gradient-to-r from-purple-600 to-pink-600 text-white font-poppins font-semibold py-3 px-6 rounded-xl hover:opacity-90 transition-opacity"
            >
              {movie ? "Update" : "Add"} Movie
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default MovieForm;
