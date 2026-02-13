import React, { useState } from "react";

const Sidebar = ({ selectedMood, onMoodSelect, activeSection, onSectionChange, onCustomMoodSearch, customMoodText }) => {
  const [moodInput, setMoodInput] = useState(customMoodText || "");

  const menuItems = [
    { id: "home", icon: "🏠", label: "Home" },
    { id: "favorites", icon: "❤️", label: "Favorites" },
    { id: "watchlist", icon: "🔖", label: "Watchlist" },
    { id: "movies", icon: "🎬", label: "Movies" },
    { id: "tvshows", icon: "📺", label: "TV Shows" },
  ];

  const moodItems = [
    { id: "happy", icon: "😊", label: "Happy" },
    { id: "sad", icon: "😢", label: "Sad" },
    { id: "excited", icon: "🤩", label: "Excited" },
    { id: "relaxed", icon: "😌", label: "Relaxed" },
    { id: "romantic", icon: "💕", label: "Romantic" },
    { id: "adventurous", icon: "🚀", label: "Adventure" },
    { id: "scared", icon: "😱", label: "Horror" },
    { id: "thoughtful", icon: "🤔", label: "Thoughtful" },
  ];

  const handleMenuClick = (itemId) => {
    onMoodSelect(null);
    onSectionChange(itemId);
    setMoodInput("");
  };

  const handleMoodInputChange = (e) => {
    setMoodInput(e.target.value);
  };

  const handleMoodInputSubmit = (e) => {
    e.preventDefault();
    if (moodInput.trim()) {
      onCustomMoodSearch(moodInput.trim());
    }
  };

  const handleMoodSelect = (moodId) => {
    onMoodSelect(selectedMood === moodId ? null : moodId);
    setMoodInput("");
  };

  return (
    <aside 
      className="fixed left-0 top-0 h-full w-56 flex flex-col py-6 z-50 border-r border-gray-700/50 overflow-y-auto scrollbar-hide"
      style={{ backgroundColor: "#0a0f1a" }}
    >
      {/* Logo */}
      <div className="mb-6 flex items-center gap-3 px-4">
        <div className="w-10 h-10 bg-gradient-to-br from-cyan-500 to-blue-600 rounded-xl flex items-center justify-center flex-shrink-0 shadow-lg shadow-cyan-500/30">
          <span className="text-white font-bold text-lg">M</span>
        </div>
        <div className="flex flex-col">
          <span className="text-white font-bold text-lg leading-tight">Mood</span>
          <span className="text-white font-bold text-sm leading-tight">Player</span>
        </div>
      </div>

      {/* Mood Type Box */}
      <div className="mb-4 px-3">
        <form onSubmit={handleMoodInputSubmit}>
          <div className="relative">
            <input
              type="text"
              value={moodInput}
              onChange={handleMoodInputChange}
              placeholder="Type your mood..."
              className="w-full bg-gray-800/60 text-white text-sm px-3 py-2.5 rounded-xl border border-gray-600/50 focus:border-cyan-500 focus:outline-none focus:ring-1 focus:ring-cyan-500 placeholder-gray-400"
            />
            <button
              type="submit"
              className="absolute right-1.5 top-1/2 -translate-y-1/2 w-7 h-7 bg-cyan-600 hover:bg-cyan-500 rounded-lg flex items-center justify-center text-white transition-colors"
            >
              <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </button>
          </div>
        </form>
        {customMoodText && (
          <div className="mt-2">
            <span className="text-xs text-purple-400">Showing: "{customMoodText}"</span>
          </div>
        )}
      </div>

      {/* Main Menu */}
      <nav className="flex-1 flex flex-col gap-2 px-3">
        {menuItems.map((item) => (
          <button
            key={item.id}
            onClick={() => handleMenuClick(item.id)}
            className={`w-full h-11 rounded-xl flex items-center gap-3 px-4 transition-all duration-300 ${
              activeSection === item.id && !selectedMood
                ? "bg-gradient-to-r from-cyan-600 to-blue-600 shadow-lg shadow-cyan-500/30"
                : "bg-gray-800/40 hover:bg-gradient-to-r hover:from-cyan-600/20 hover:to-blue-600/20 hover:scale-105 hover:shadow-md hover:shadow-cyan-500/20"
            }`}
          >
            <span className="text-xl w-7 text-center">{item.icon}</span>
            <span className="text-white text-sm font-medium">{item.label}</span>
          </button>
        ))}

        <div className="w-full h-px bg-gradient-to-r from-transparent via-gray-600 to-transparent my-3"></div>

        {/* Mood Selection */}
        <p className="text-white text-xs font-semibold px-3 mb-2 uppercase tracking-wider">Moods</p>
        {moodItems.map((mood) => (
          <button
            key={mood.id}
            onClick={() => handleMoodSelect(mood.id)}
            className={`w-full h-11 rounded-xl flex items-center gap-3 px-4 transition-all duration-300 ${
              selectedMood === mood.id
                ? "bg-gradient-to-r from-cyan-600 to-blue-600 shadow-lg shadow-cyan-500/30"
                : "bg-gray-800/40 hover:bg-gradient-to-r hover:from-cyan-600/20 hover:to-blue-600/20 hover:scale-105 hover:shadow-md hover:shadow-cyan-500/20"
            }`}
          >
            <span className="text-xl w-7 text-center">{mood.icon}</span>
            <span className="text-white text-sm font-medium">{mood.label}</span>
          </button>
        ))}
      </nav>
    </aside>
  );
};

export default Sidebar;
