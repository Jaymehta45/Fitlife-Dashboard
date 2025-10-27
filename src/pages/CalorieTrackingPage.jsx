// Calorie tracking page
// TODO: Add integration with Supabase for meal data storage

import React, { useState } from 'react';
import { useDashboard } from '../context/DashboardContext';
import { Plus, Apple, Utensils, Target, X } from 'lucide-react';

export default function CalorieTrackingPage() {
  const { addUploadEntry } = useDashboard();
  const [meals, setMeals] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({
    date: new Date().toISOString().split('T')[0],
    mealType: 'Breakfast',
    name: '',
    calories: '',
    protein: '',
    carbs: '',
    fat: '',
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
    
    if (!formData.name || !formData.calories) {
      alert('Name and calories are required');
      return;
    }

    const newMeal = {
      id: Date.now(),
      date: formData.date,
      mealType: formData.mealType,
      name: formData.name,
      calories: parseInt(formData.calories),
      protein: formData.protein ? parseInt(formData.protein) : 0,
      carbs: formData.carbs ? parseInt(formData.carbs) : 0,
      fat: formData.fat ? parseInt(formData.fat) : 0,
      notes: formData.notes
    };

    setMeals([...meals, newMeal]);
    setShowForm(false);
    setFormData({
      date: new Date().toISOString().split('T')[0],
      mealType: 'Breakfast',
      name: '',
      calories: '',
      protein: '',
      carbs: '',
      fat: '',
      notes: ''
    });
  };

  const deleteMeal = (id) => {
    setMeals(meals.filter(m => m.id !== id));
  };

  const getTotalCalories = () => {
    const today = new Date().toISOString().split('T')[0];
    return meals
      .filter(m => m.date === today)
      .reduce((sum, m) => sum + m.calories, 0);
  };

  const getTotalMacros = () => {
    const today = new Date().toISOString().split('T')[0];
    return meals
      .filter(m => m.date === today)
      .reduce((acc, m) => ({
        protein: acc.protein + m.protein,
        carbs: acc.carbs + m.carbs,
        fat: acc.fat + m.fat
      }), { protein: 0, carbs: 0, fat: 0 });
  };

  const dailyGoal = 2000;
  const macros = getTotalMacros();
  const totalCalories = getTotalCalories();

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="bg-white border-2 border-black p-8 mb-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-black text-black">Calorie Tracking</h1>
            <p className="text-gray-600 mt-2 text-lg">
              Log your meals and monitor your daily nutrition
            </p>
          </div>
          <button
            onClick={() => setShowForm(!showForm)}
            className="bg-black text-white border-2 border-white px-6 py-3 font-black hover:bg-gray-900 transition-all duration-200 flex items-center space-x-2"
          >
            <Plus className="w-5 h-5" />
            <span>Add Meal</span>
          </button>
        </div>
      </div>

      {/* Daily Summary */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
        <div className="bg-white border-2 border-black p-6">
          <div className="flex items-center space-x-3 mb-2">
            <Target className="w-6 h-6 text-black" />
            <h3 className="text-sm font-bold text-gray-700">Calories</h3>
          </div>
          <div className="flex items-baseline space-x-2">
            <span className="text-2xl font-black text-black">{totalCalories}</span>
            <span className="text-sm font-bold text-gray-600">/ {dailyGoal}</span>
          </div>
        </div>
        <div className="bg-white border-2 border-black p-6">
          <div className="flex items-center space-x-3 mb-2">
            <Apple className="w-6 h-6 text-black" />
            <h3 className="text-sm font-bold text-gray-700">Protein</h3>
          </div>
          <div className="flex items-baseline space-x-2">
            <span className="text-2xl font-black text-black">{macros.protein}g</span>
          </div>
        </div>
        <div className="bg-white border-2 border-black p-6">
          <div className="flex items-center space-x-3 mb-2">
            <Utensils className="w-6 h-6 text-black" />
            <h3 className="text-sm font-bold text-gray-700">Carbs</h3>
          </div>
          <div className="flex items-baseline space-x-2">
            <span className="text-2xl font-black text-black">{macros.carbs}g</span>
          </div>
        </div>
        <div className="bg-white border-2 border-black p-6">
          <div className="flex items-center space-x-3 mb-2">
            <Utensils className="w-6 h-6 text-black" />
            <h3 className="text-sm font-bold text-gray-700">Fat</h3>
          </div>
          <div className="flex items-baseline space-x-2">
            <span className="text-2xl font-black text-black">{macros.fat}g</span>
          </div>
        </div>
      </div>

      {/* Add Meal Form */}
      {showForm && (
        <div className="bg-white border-2 border-black p-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-black text-black">New Meal</h2>
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
                <label className="block text-sm font-bold text-black mb-2">Meal Type</label>
                <select
                  name="mealType"
                  value={formData.mealType}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border-2 border-black bg-white text-black"
                  required
                >
                  <option value="Breakfast">Breakfast</option>
                  <option value="Lunch">Lunch</option>
                  <option value="Dinner">Dinner</option>
                  <option value="Snack">Snack</option>
                </select>
              </div>
            </div>

            <div>
              <label className="block text-sm font-bold text-black mb-2">Meal Name *</label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleInputChange}
                placeholder="e.g., Grilled Chicken Salad"
                className="w-full px-3 py-2 border-2 border-black bg-white text-black"
                required
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <div>
                <label className="block text-sm font-bold text-black mb-2">Calories *</label>
                <input
                  type="number"
                  name="calories"
                  value={formData.calories}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border-2 border-black bg-white text-black"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-bold text-black mb-2">Protein (g)</label>
                <input
                  type="number"
                  name="protein"
                  value={formData.protein}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border-2 border-black bg-white text-black"
                />
              </div>
              <div>
                <label className="block text-sm font-bold text-black mb-2">Carbs (g)</label>
                <input
                  type="number"
                  name="carbs"
                  value={formData.carbs}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border-2 border-black bg-white text-black"
                />
              </div>
              <div>
                <label className="block text-sm font-bold text-black mb-2">Fat (g)</label>
                <input
                  type="number"
                  name="fat"
                  value={formData.fat}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border-2 border-black bg-white text-black"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-bold text-black mb-2">Notes</label>
              <textarea
                name="notes"
                value={formData.notes}
                onChange={handleInputChange}
                rows={2}
                placeholder="Additional notes about this meal..."
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
                Add Meal
              </button>
            </div>
          </form>
        </div>
      )}

      {/* Meals List */}
      {meals.length === 0 ? (
        <div className="bg-white border-2 border-black p-12 text-center">
          <Utensils className="w-16 h-16 text-black mx-auto mb-4" />
          <h3 className="text-xl font-black text-black mb-2">No meals logged yet</h3>
          <p className="text-gray-600">Start tracking your meals to see them here</p>
        </div>
      ) : (
        <div className="space-y-4">
          {meals.map((meal) => (
            <div key={meal.id} className="bg-white border-2 border-black p-6">
              <div className="flex items-start justify-between">
                <div className="flex items-start space-x-4">
                  <div className="w-12 h-12 bg-black border-2 border-white flex items-center justify-center">
                    <Utensils className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <div className="flex items-center space-x-3 mb-2">
                      <h3 className="text-lg font-black text-black">{meal.name}</h3>
                      <span className="text-sm font-bold bg-black text-white px-2 py-1">{meal.mealType}</span>
                      <span className="text-sm font-bold text-gray-600">{meal.date}</span>
                    </div>
                    <div className="grid grid-cols-4 gap-4 text-sm">
                      <div>
                        <span className="font-bold text-gray-700">Calories:</span>
                        <span className="font-black text-black ml-2">{meal.calories} cal</span>
                      </div>
                      <div>
                        <span className="font-bold text-gray-700">Protein:</span>
                        <span className="font-black text-black ml-2">{meal.protein}g</span>
                      </div>
                      <div>
                        <span className="font-bold text-gray-700">Carbs:</span>
                        <span className="font-black text-black ml-2">{meal.carbs}g</span>
                      </div>
                      <div>
                        <span className="font-bold text-gray-700">Fat:</span>
                        <span className="font-black text-black ml-2">{meal.fat}g</span>
                      </div>
                    </div>
                    {meal.notes && (
                      <p className="text-sm text-gray-600 mt-2">{meal.notes}</p>
                    )}
                  </div>
                </div>
                <button
                  onClick={() => deleteMeal(meal.id)}
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

