import React from "react";
import MovieCard from "./MovieCard";

const MovieList = ({ movies, onEdit, onDelete }) => {
  if (movies.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-20 animate-fade-in">
        <div className="text-8xl mb-6">🎬</div>
        <h2 className="font-poppins font-semibold text-2xl text-gray-700 mb-2">
          No Movies Found
        </h2>
        <p className="font-poppins text-gray text-center max-w-md">
          Start building your movie collection by adding your first movie!
        </p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 p-6">
      {movies.map((movie, index) => (
        <div
          key={movie.id}
          style={{ "--animation-delay": `${index * 0.1}s` }}
        >
          <MovieCard movie={movie} onEdit={onEdit} onDelete={onDelete} />
        </div>
      ))}
    </div>
  );
};

export default MovieList;
