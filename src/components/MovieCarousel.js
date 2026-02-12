import React, { useRef } from "react";
import { moods } from "../data/movies";

const MovieCarousel = ({ title, movies, emoji, moodId, onEdit, onDelete }) => {
  const scrollRef = useRef(null);

  const scroll = (direction) => {
    if (scrollRef.current) {
      const scrollAmount = 320;
      scrollRef.current.scrollBy({
        left: direction === "left" ? -scrollAmount : scrollAmount,
        behavior: "smooth",
      });
    }
  };

  const getMoodInfo = (id) => moods.find((m) => m.id === id);

  if (movies.length === 0) return null;

  return (
    <div className="mb-10 group/carousel">
      {/* Section Header */}
      <div className="flex items-center justify-between mb-4 px-4">
        <h2 className="text-xl md:text-2xl font-semibold text-white flex items-center gap-3">
          {emoji && <span className="text-2xl">{emoji}</span>}
          {title}
          <span className="text-gray-500 text-base font-normal">({movies.length})</span>
        </h2>
        <div className="flex gap-2 opacity-0 group-hover/carousel:opacity-100 transition-opacity">
          <button
            onClick={() => scroll("left")}
            className="w-10 h-10 bg-gray-800 hover:bg-gray-700 rounded-full flex items-center justify-center text-white transition-colors"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
          </button>
          <button
            onClick={() => scroll("right")}
            className="w-10 h-10 bg-gray-800 hover:bg-gray-700 rounded-full flex items-center justify-center text-white transition-colors"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </button>
        </div>
      </div>

      {/* Carousel */}
      <div
        ref={scrollRef}
        className="flex gap-4 overflow-x-auto scrollbar-hide px-4 pb-4"
        style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
      >
        {movies.map((movie, index) => (
          <div
            key={movie.id}
            className="flex-shrink-0 w-48 md:w-56 group cursor-pointer"
            style={{ animationDelay: `${index * 0.05}s` }}
          >
            {/* Poster */}
            <div className="relative h-72 md:h-80 rounded-xl overflow-hidden mb-3 shadow-lg shadow-black/30">
              <img
                src={movie.poster}
                alt={movie.title}
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
              />
              
              {/* Overlay on Hover */}
              <div className="absolute inset-0 bg-gradient-to-t from-black via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <div className="absolute bottom-0 left-0 right-0 p-4">
                  <div className="flex gap-2 mb-3">
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        onEdit(movie);
                      }}
                      className="flex-1 bg-purple-600 hover:bg-purple-500 text-white text-sm py-2 rounded-lg transition-colors"
                    >
                      Edit
                    </button>
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        onDelete(movie.id);
                      }}
                      className="flex-1 bg-red-600 hover:bg-red-500 text-white text-sm py-2 rounded-lg transition-colors"
                    >
                      Delete
                    </button>
                  </div>
                  <button className="w-full bg-white text-gray-900 font-semibold py-2 rounded-lg hover:bg-gray-200 transition-colors flex items-center justify-center gap-2">
                    <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M6.3 2.841A1.5 1.5 0 004 4.11V15.89a1.5 1.5 0 002.3 1.269l9.344-5.89a1.5 1.5 0 000-2.538L6.3 2.84z" />
                    </svg>
                    Play
                  </button>
                </div>
              </div>

              {/* Rating Badge */}
              <div className="absolute top-2 right-2 bg-black/70 backdrop-blur-sm px-2 py-1 rounded-md">
                <span className="text-yellow-400 text-sm font-semibold">⭐ {movie.rating}</span>
              </div>

              {/* Genre Badge */}
              <div className="absolute top-2 left-2 bg-purple-600/80 backdrop-blur-sm px-2 py-1 rounded-md">
                <span className="text-white text-xs">{movie.genre}</span>
              </div>
            </div>

            {/* Title & Info */}
            <h3 className="text-white font-semibold truncate group-hover:text-purple-400 transition-colors">
              {movie.title}
            </h3>
            <div className="flex items-center justify-between text-sm">
              <span className="text-gray-400">{movie.year}</span>
              {/* Mood Icons */}
              <div className="flex gap-1">
                {movie.moods?.slice(0, 3).map((m) => (
                  <span key={m} className="text-sm" title={getMoodInfo(m)?.name}>
                    {getMoodInfo(m)?.emoji}
                  </span>
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MovieCarousel;
