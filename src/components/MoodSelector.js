import React from "react";
import { moods } from "../data/movies";

const MoodSelector = ({ selectedMood, onMoodSelect }) => {
  return (
    <section className="py-12 px-6 bg-gradient-to-br from-purple/5 to-light-purple/10">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <h2 className="font-poppins font-semibold text-3xl md:text-4xl text-gray-800 mb-3">
            How are you feeling today?
          </h2>
          <p className="font-poppins text-gray text-lg">
            Select your mood and we'll recommend the perfect movies for you
          </p>
        </div>

        {/* Mood Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-8 gap-4">
          {moods.map((mood) => (
            <button
              key={mood.id}
              onClick={() => onMoodSelect(selectedMood === mood.id ? null : mood.id)}
              className={`group relative p-4 rounded-2xl transition-all duration-300 transform hover:scale-105 ${
                selectedMood === mood.id
                  ? `bg-gradient-to-br ${mood.color} shadow-lg scale-105`
                  : "bg-white hover:shadow-lg border-2 border-transparent hover:border-purple/20"
              }`}
            >
              {/* Emoji */}
              <div className="text-4xl mb-2 transform group-hover:scale-110 transition-transform duration-300">
                {mood.emoji}
              </div>
              
              {/* Name */}
              <p
                className={`font-poppins font-semibold text-sm ${
                  selectedMood === mood.id ? "text-white" : "text-gray-700"
                }`}
              >
                {mood.name}
              </p>

              {/* Selected indicator */}
              {selectedMood === mood.id && (
                <div className="absolute -top-2 -right-2 w-6 h-6 bg-white rounded-full flex items-center justify-center shadow-md">
                  <svg className="w-4 h-4 text-purple" fill="currentColor" viewBox="0 0 20 20">
                    <path
                      fillRule="evenodd"
                      d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                      clipRule="evenodd"
                    />
                  </svg>
                </div>
              )}
            </button>
          ))}
        </div>

        {/* Selected Mood Description */}
        {selectedMood && (
          <div className="mt-8 text-center animate-fade-in">
            <div className={`inline-flex items-center gap-3 px-6 py-3 rounded-full bg-gradient-to-r ${
              moods.find((m) => m.id === selectedMood)?.color
            } text-white shadow-lg`}>
              <span className="text-2xl">
                {moods.find((m) => m.id === selectedMood)?.emoji}
              </span>
              <span className="font-poppins font-medium">
                {moods.find((m) => m.id === selectedMood)?.description}
              </span>
            </div>
            <button
              onClick={() => onMoodSelect(null)}
              className="block mx-auto mt-4 font-poppins text-gray hover:text-purple transition-colors underline"
            >
              Clear mood filter
            </button>
          </div>
        )}
      </div>
    </section>
  );
};

export default MoodSelector;
