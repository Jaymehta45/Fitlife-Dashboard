// Workout tracking page
// TODO: Add integration with Supabase for workout data storage

import React, { useState } from 'react';
import { useDashboard } from '../context/DashboardContext';
import { Plus, Dumbbell, Clock, Flame, X } from 'lucide-react';

export default function WorkoutTrackingPage() {
  const { addUploadEntry, toast } = useDashboard();
  const [workouts, setWorkouts] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({
    date: new Date().toISOString().split('T')[0],
    type: 'Strength',
    duration: '',
    calories: '',
    exercises: '',
    notes: ''
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (!formData.duration || !formData.calories) {
      alert('Duration and calories are required');
      return;
    }

    const newWorkout = {
      id: Date.now(),
      date: formData.date,
      type: formData.type,
      duration: parseInt(formData.duration),
      calories: parseInt(formData.calories),
      exercises: formData.exercises ? formData.exercises.split(',').map(s => s.trim()) : [],
      notes: formData.notes
    };

    setWorkouts([...workouts, newWorkout]);
    setShowForm(false);
    setFormData({
      date: new Date().toISOString().split('T')[0],
      type: 'Strength',
      duration: '',
      calories: '',
      exercises: '',
      notes: ''
    });
  };

  const deleteWorkout = (id) => {
    setWorkouts(workouts.filter(w => w.id !== id));
  };

  const getTypeColor = (type) => {
    switch(type) {
      case 'Strength':
        return 'bg-black border-2 border-white text-white';
      case 'Cardio':
        return 'bg-gray-900 border-2 border-gray-500 text-white';
      case 'Yoga':
        return 'bg-gray-800 border-2 border-gray-400 text-white';
      case 'HIIT':
        return 'bg-gray-700 border-2 border-gray-300 text-white';
      default:
        return 'bg-black border-2 border-white text-white';
    }
  };

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="bg-white border-2 border-black p-8 mb-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-black text-black">Workout Tracking</h1>
            <p className="text-gray-600 mt-2 text-lg">
              Log your workouts and track your training progress
            </p>
          </div>
          <button
            onClick={() => setShowForm(!showForm)}
            className="bg-black text-white border-2 border-white px-6 py-3 font-black hover:bg-gray-900 transition-all duration-200 flex items-center space-x-2"
          >
            <Plus className="w-5 h-5" />
            <span>Add Workout</span>
          </button>
        </div>
      </div>

      {/* Add Workout Form */}
      {showForm && (
        <div className="bg-white border-2 border-black p-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-black text-black">New Workout</h2>
            <button
              onClick={() => setShowForm(false)}
              className="text-black hover:text-gray-600"
            >
              <X className="w-6 h-6" />
            </button>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-bold text-black mb-2">Date</label>
                <input
                  type="date"
                  name="date"
                  value={formData.date}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border-2 border-black bg-white text-black"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-bold text-black mb-2">Type</label>
                <select
                  name="type"
                  value={formData.type}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border-2 border-black bg-white text-black"
                  required
                >
                  <option value="Strength">Strength</option>
                  <option value="Cardio">Cardio</option>
                  <option value="Yoga">Yoga</option>
                  <option value="HIIT">HIIT</option>
                </select>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-bold text-black mb-2">Duration (min)</label>
                <input
                  type="number"
                  name="duration"
                  value={formData.duration}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border-2 border-black bg-white text-black"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-bold text-black mb-2">Calories Burned</label>
                <input
                  type="number"
                  name="calories"
                  value={formData.calories}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border-2 border-black bg-white text-black"
                  required
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-bold text-black mb-2">Exercises (comma-separated)</label>
              <input
                type="text"
                name="exercises"
                value={formData.exercises}
                onChange={handleInputChange}
                placeholder="Bench Press, Squats, Deadlifts"
                className="w-full px-3 py-2 border-2 border-black bg-white text-black"
              />
            </div>

            <div>
              <label className="block text-sm font-bold text-black mb-2">Notes</label>
              <textarea
                name="notes"
                value={formData.notes}
                onChange={handleInputChange}
                rows={3}
                className="w-full px-3 py-2 border-2 border-black bg-white text-black resize-none"
              />
            </div>

            <div className="flex justify-end space-x-3">
              <button
                type="button"
                onClick={() => setShowForm(false)}
                className="px-6 py-2 border-2 border-black text-black font-black hover:bg-gray-100 transition-all duration-200"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="bg-black text-white border-2 border-white px-6 py-2 font-black hover:bg-gray-900 transition-all duration-200"
              >
                Add Workout
              </button>
            </div>
          </form>
        </div>
      )}

      {/* Workout List */}
      {workouts.length === 0 ? (
        <div className="bg-white border-2 border-black p-12 text-center">
          <Dumbbell className="w-16 h-16 text-black mx-auto mb-4" />
          <h3 className="text-xl font-black text-black mb-2">No workouts yet</h3>
          <p className="text-gray-600">Start tracking your workouts to see them here</p>
        </div>
      ) : (
        <div className="space-y-4">
          {workouts.map((workout) => (
            <div key={workout.id} className="bg-white border-2 border-black p-6">
              <div className="flex items-start justify-between">
                <div className="flex items-start space-x-4">
                  <div className={`w-12 h-12 flex items-center justify-center ${getTypeColor(workout.type)}`}>
                    <Dumbbell className="w-6 h-6" />
                  </div>
                  <div>
                    <div className="flex items-center space-x-3 mb-2">
                      <h3 className="text-lg font-black text-black">{workout.type}</h3>
                      <span className="text-sm font-bold text-gray-600">{workout.date}</span>
                    </div>
                    <div className="flex items-center space-x-4 text-sm">
                      <div className="flex items-center space-x-1">
                        <Clock className="w-4 h-4 text-black" />
                        <span className="font-bold text-black">{workout.duration} min</span>
                      </div>
                      <div className="flex items-center space-x-1">
                        <Flame className="w-4 h-4 text-black" />
                        <span className="font-bold text-black">{workout.calories} cal</span>
                      </div>
                    </div>
                    {workout.exercises.length > 0 && (
                      <div className="mt-2">
                        <p className="text-sm font-bold text-gray-700">Exercises:</p>
                        <p className="text-sm text-gray-600">{workout.exercises.join(', ')}</p>
                      </div>
                    )}
                    {workout.notes && (
                      <p className="text-sm text-gray-600 mt-2">{workout.notes}</p>
                    )}
                  </div>
                </div>
                <button
                  onClick={() => deleteWorkout(workout.id)}
                  className="text-black hover:text-gray-600 transition-colors"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

