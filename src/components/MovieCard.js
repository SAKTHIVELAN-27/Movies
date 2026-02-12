import React from "react";
import { moods } from "../data/movies";

const MovieCard = ({ movie, onEdit, onDelete }) => {
  // Get mood objects for this movie
  const movieMoods = movie.moods
    ? moods.filter((m) => movie.moods.includes(m.id))
    : [];

  return (
    <div className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-2xl hover:scale-105 transition-all duration-300 animate-fade-up group">
      {/* Poster Image */}
      <div className="relative h-64 overflow-hidden">
        <img
          src={movie.poster}
          alt={movie.title}
          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
        />
        <div className="absolute top-3 right-3 bg-purple text-white px-3 py-1 rounded-full font-poppins font-semibold text-sm">
          ⭐ {movie.rating}
        </div>
        <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-4">
          <span className="text-white/90 font-poppins text-sm bg-white/20 backdrop-blur-sm px-3 py-1 rounded-full">
            {movie.genre}
          </span>
        </div>
      </div>

      {/* Content */}
      <div className="p-5">
        <h3 className="font-poppins font-semibold text-xl text-gray-800 mb-1">
          {movie.title}
        </h3>
        <p className="text-gray font-poppins text-sm mb-2">{movie.year}</p>
        
        {/* Mood Tags */}
        {movieMoods.length > 0 && (
          <div className="flex flex-wrap gap-1 mb-3">
            {movieMoods.slice(0, 3).map((mood) => (
              <span
                key={mood.id}
                className="text-xs px-2 py-1 bg-gray-100 rounded-full flex items-center gap-1"
                title={mood.name}
              >
                <span>{mood.emoji}</span>
                <span className="text-gray-600">{mood.name}</span>
              </span>
            ))}
          </div>
        )}
        
        <p className="text-gray-600 font-poppins text-sm line-clamp-2 mb-4">
          {movie.description}
        </p>

        {/* Actions */}
        <div className="flex gap-3">
          <button
            onClick={() => onEdit(movie)}
            className="flex-1 bg-light-purple text-white font-poppins font-medium py-2 px-4 rounded-lg hover:bg-purple transition-colors duration-300"
          >
            Edit
          </button>
          <button
            onClick={() => onDelete(movie.id)}
            className="flex-1 bg-red-500 text-white font-poppins font-medium py-2 px-4 rounded-lg hover:bg-red-600 transition-colors duration-300"
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  );
};

export default MovieCard;
