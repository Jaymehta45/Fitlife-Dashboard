// Program card component for displaying fitness programs
// TODO: Replace with real data from Supabase
// TODO: Add program detail modal functionality
// TODO: Integrate with payment system (Razorpay)

import React, { useState } from 'react';
import { Star, Clock, Users, ArrowRight, Eye, ShoppingCart } from 'lucide-react';

export default function ProgramCard({ program, onViewDetails, onJoinProgram }) {
  const [isHovered, setIsHovered] = useState(false);

  const getDifficultyColor = (difficulty) => {
    switch (difficulty.toLowerCase()) {
      case 'beginner':
        return 'bg-green-100 text-green-800';
      case 'intermediate':
        return 'bg-yellow-100 text-yellow-800';
      case 'advanced':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-neutral-100 text-neutral-800';
    }
  };

  return (
    <div 
      className="card hover:shadow-soft-lg transition-all duration-300 cursor-pointer group"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Program Image */}
      <div className="relative mb-4">
        <div className="w-full h-48 bg-gradient-to-br from-primary-100 to-accent-100 rounded-lg flex items-center justify-center">
          <div className="text-6xl">💪</div>
        </div>
        <div className="absolute top-3 right-3">
          <span className={`px-2 py-1 text-xs font-medium rounded-full ${getDifficultyColor(program.difficulty)}`}>
            {program.difficulty}
          </span>
        </div>
      </div>

      {/* Program Info */}
      <div className="space-y-3">
        <div>
          <h3 className="text-xl font-semibold text-neutral-900 mb-2">
            {program.title}
          </h3>
          <p className="text-neutral-600 text-sm leading-relaxed">
            {program.description}
          </p>
        </div>

        {/* Features */}
        <div className="space-y-2">
          {program.features.slice(0, 3).map((feature, index) => (
            <div key={index} className="flex items-center space-x-2">
              <div className="w-1.5 h-1.5 bg-primary-500 rounded-full"></div>
              <span className="text-sm text-neutral-600">{feature}</span>
            </div>
          ))}
          {program.features.length > 3 && (
            <p className="text-xs text-neutral-500">
              +{program.features.length - 3} more features
            </p>
          )}
        </div>

        {/* Stats */}
        <div className="flex items-center justify-between text-sm text-neutral-500">
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-1">
              <Clock className="w-4 h-4" />
              <span>{program.duration}</span>
            </div>
            <div className="flex items-center space-x-1">
              <Users className="w-4 h-4" />
              <span>{program.reviews} reviews</span>
            </div>
          </div>
          <div className="flex items-center space-x-1">
            <Star className="w-4 h-4 text-yellow-500 fill-current" />
            <span className="font-medium">{program.rating}</span>
          </div>
        </div>

        {/* Price */}
        <div className="flex items-center justify-between">
          <div>
            <span className="text-2xl font-bold text-neutral-900">${program.price}</span>
            <span className="text-sm text-neutral-500 ml-1">one-time</span>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex space-x-3 pt-2">
          <button
            onClick={() => onViewDetails(program)}
            className="flex-1 btn-secondary flex items-center justify-center space-x-2 group-hover:bg-primary-50 group-hover:text-primary-700 group-hover:border-primary-300"
          >
            <Eye className="w-4 h-4" />
            <span>View Details</span>
          </button>
          <button
            onClick={() => onJoinProgram(program)}
            className="flex-1 btn-primary flex items-center justify-center space-x-2 group-hover:bg-primary-600"
          >
            <ShoppingCart className="w-4 h-4" />
            <span>Join Program</span>
            <ArrowRight className={`w-4 h-4 transition-transform ${isHovered ? 'translate-x-1' : ''}`} />
          </button>
        </div>
      </div>
    </div>
  );
}
