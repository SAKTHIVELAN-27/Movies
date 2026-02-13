import React, { useRef } from "react";
import { moods } from "../data/movies";

const MovieCarousel = ({ 
  title, 
  movies, 
  emoji, 
  moodId, 
  onFavorite,
  onWatchlist,
  isFavorite,
  isInWatchlist
}) => {
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
    <div className="mb-10 group/carousel relative">
      {/* Section Header */}
      <div className="flex items-center justify-between mb-4 px-4">
        <h2 className="text-xl md:text-2xl font-semibold text-white flex items-center gap-3">
          {emoji && <span className="text-2xl">{emoji}</span>}
          {title}
          <span className="text-gray-500 text-base font-normal">({movies.length})</span>
        </h2>
      </div>

      {/* Left Arrow */}
      <button
        onClick={() => scroll("left")}
        className="absolute left-0 top-1/2 -translate-y-1/2 z-10 w-12 h-24 bg-black/70 hover:bg-black/90 flex items-center justify-center text-white transition-all opacity-0 group-hover/carousel:opacity-100 rounded-r-lg"
      >
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
        </svg>
      </button>

      {/* Right Arrow */}
      <button
        onClick={() => scroll("right")}
        className="absolute right-0 top-1/2 -translate-y-1/2 z-10 w-12 h-24 bg-black/70 hover:bg-black/90 flex items-center justify-center text-white transition-all opacity-0 group-hover/carousel:opacity-100 rounded-l-lg"
      >
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
        </svg>
      </button>

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

              {/* Favorite & Watchlist Buttons */}
              <div className="absolute top-12 right-2 flex flex-col gap-2">
                {onFavorite && (
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      onFavorite(movie);
                    }}
                    className={`w-8 h-8 rounded-full flex items-center justify-center transition-all ${
                      isFavorite && isFavorite(movie)
                        ? "bg-red-500 text-white"
                        : "bg-black/50 text-white hover:bg-red-500"
                    }`}
                    title={isFavorite && isFavorite(movie) ? "Remove from Favorites" : "Add to Favorites"}
                  >
                    <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z" clipRule="evenodd" />
                    </svg>
                  </button>
                )}
                {onWatchlist && (
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      onWatchlist(movie);
                    }}
                    className={`w-8 h-8 rounded-full flex items-center justify-center transition-all ${
                      isInWatchlist && isInWatchlist(movie)
                        ? "bg-purple-500 text-white"
                        : "bg-black/50 text-white hover:bg-purple-500"
                    }`}
                    title={isInWatchlist && isInWatchlist(movie) ? "Remove from Watchlist" : "Add to Watchlist"}
                  >
                    <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M5 4a2 2 0 012-2h6a2 2 0 012 2v14l-5-2.5L5 18V4z" />
                    </svg>
                  </button>
                )}
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
