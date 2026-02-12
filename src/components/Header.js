import React from "react";

const Header = ({ onAddClick, searchQuery, setSearchQuery }) => {
  return (
    <header className="bg-gradient-to-r from-purple to-light-purple py-6 px-8 shadow-lg">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
        {/* Logo & Title */}
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center">
            <span className="text-purple text-2xl font-bold">🎬</span>
          </div>
          <h1 className="font-poppins font-semibold text-3xl text-white">
            Movies
          </h1>
        </div>

        {/* Search Bar */}
        <div className="flex-1 max-w-md">
          <div className="relative">
            <input
              type="text"
              placeholder="Search movies..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full py-3 px-5 pr-12 rounded-full bg-white/20 backdrop-blur-sm text-white placeholder-white/70 font-poppins text-base focus:outline-none focus:ring-2 focus:ring-white/50 transition-all"
            />
            <svg
              className="absolute right-4 top-1/2 -translate-y-1/2 w-5 h-5 text-white/70"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
              />
            </svg>
          </div>
        </div>

        {/* Add Button */}
        <button
          onClick={onAddClick}
          className="flex items-center gap-2 bg-white text-purple font-poppins font-semibold py-3 px-6 rounded-full hover:bg-opacity-90 hover:scale-105 transition-all duration-300 shadow-lg"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
          </svg>
          Add Movie
        </button>
      </div>
    </header>
  );
};

export default Header;
