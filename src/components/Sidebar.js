import React from "react";

const Sidebar = ({ selectedMood, onMoodSelect, onAddClick }) => {
  const menuItems = [
    { icon: "🏠", label: "Home", action: () => onMoodSelect(null) },
    { icon: "❤️", label: "Favorites", action: () => {} },
    { icon: "🔖", label: "Watchlist", action: () => {} },
    { icon: "🎬", label: "Movies", action: () => onMoodSelect(null) },
    { icon: "📺", label: "TV Shows", action: () => {} },
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

  return (
    <aside className="fixed left-0 top-0 h-full w-20 bg-gray-900/95 backdrop-blur-lg flex flex-col items-center py-6 z-50 border-r border-gray-800">
      {/* Logo */}
      <div className="mb-8">
        <div className="w-12 h-12 bg-gradient-to-br from-purple-600 to-pink-500 rounded-xl flex items-center justify-center">
          <span className="text-white font-bold text-xl">M</span>
        </div>
      </div>

      {/* Main Menu */}
      <nav className="flex-1 flex flex-col gap-2">
        {menuItems.map((item, index) => (
          <button
            key={index}
            onClick={item.action}
            className="w-12 h-12 rounded-xl flex items-center justify-center text-2xl hover:bg-gray-800 transition-all duration-300 group relative"
            title={item.label}
          >
            {item.icon}
            <span className="absolute left-16 bg-gray-800 text-white text-sm px-3 py-2 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap z-50">
              {item.label}
            </span>
          </button>
        ))}

        <div className="w-8 h-px bg-gray-700 my-4 mx-auto"></div>

        {/* Mood Selection */}
        <p className="text-gray-500 text-xs text-center mb-2">Moods</p>
        {moodItems.map((mood) => (
          <button
            key={mood.id}
            onClick={() => onMoodSelect(selectedMood === mood.id ? null : mood.id)}
            className={`w-12 h-12 rounded-xl flex items-center justify-center text-xl transition-all duration-300 group relative ${
              selectedMood === mood.id
                ? "bg-purple-600 scale-110 shadow-lg shadow-purple-500/50"
                : "hover:bg-gray-800"
            }`}
            title={mood.label}
          >
            {mood.icon}
            <span className="absolute left-16 bg-gray-800 text-white text-sm px-3 py-2 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap z-50">
              {mood.label}
            </span>
          </button>
        ))}
      </nav>

      {/* Add Movie Button */}
      <button
        onClick={onAddClick}
        className="w-12 h-12 rounded-xl bg-purple-600 hover:bg-purple-500 flex items-center justify-center text-white text-2xl transition-all duration-300 hover:scale-110 shadow-lg shadow-purple-500/30"
        title="Add Movie"
      >
        +
      </button>
    </aside>
  );
};

export default Sidebar;
