// Upload form component with date locking logic
// TODO: Replace localStorage with Supabase storage
// TODO: Add image upload to Supabase storage
// Key integration points:
// - Form submission: supabase.from('uploads').insert(entry)
// - Image upload: supabase.storage.from('photos').upload(file)

import React, { useState, useEffect } from 'react';
import { useDashboard } from '../context/DashboardContext';
import { Calendar, Weight, Percent, Flame, FileText, Camera, Lock, CheckCircle } from 'lucide-react';
import { formatDateForInput, getDateFromInput, formatDate } from '../utils/dateUtils';

export default function UploadForm() {
  const { 
    addUploadEntry, 
    canSubmitToday, 
    nextUpdateDate, 
    isDateLocked, 
    updateDay,
    loading 
  } = useDashboard();

  const [formData, setFormData] = useState({
    date: formatDateForInput(new Date()),
    weight: '',
    bodyFat: '',
    calories: '',
    notes: '',
    photo: null
  });

  const [errors, setErrors] = useState({});
  const [imagePreview, setImagePreview] = useState(null);

  const today = new Date();
  const isTodayLocked = isDateLocked(today);
  const isUpdateDay = today.getDate() === updateDay;
  // Always allow editing - users can update anytime
  const canEdit = true;

  useEffect(() => {
    // Reset form when date changes
    setFormData(prev => ({
      ...prev,
      weight: '',
      bodyFat: '',
      calories: '',
      notes: '',
      photo: null
    }));
    setImagePreview(null);
    setErrors({});
  }, [formData.date]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      // TODO: In production, upload to Supabase storage
      // const { data, error } = await supabase.storage
      //   .from('photos')
      //   .upload(`uploads/${Date.now()}-${file.name}`, file);
      
      // For now, convert to base64 for preview
      const reader = new FileReader();
      reader.onload = (e) => {
        setImagePreview(e.target.result);
        setFormData(prev => ({
          ...prev,
          photo: e.target.result // Store as base64 for demo
        }));
      };
      reader.readAsDataURL(file);
    }
  };

  const validateForm = () => {
    const newErrors = {};
    
    if (!formData.weight || formData.weight <= 0) {
      newErrors.weight = 'Weight is required and must be greater than 0';
    }
    
    if (!formData.bodyFat || formData.bodyFat < 0 || formData.bodyFat > 100) {
      newErrors.bodyFat = 'Body fat percentage must be between 0 and 100';
    }
    
    if (formData.calories && (formData.calories < 0 || formData.calories > 10000)) {
      newErrors.calories = 'Calories must be between 0 and 10000';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) return;
    
    const entry = {
      date: formData.date,
      weight: parseFloat(formData.weight),
      bodyFat: parseFloat(formData.bodyFat),
      calories: formData.calories ? parseInt(formData.calories) : null,
      notes: formData.notes,
      photo: formData.photo
    };

    await addUploadEntry(entry);
    
    // Don't reset form - allow user to update again immediately
    // Keep the values so user can modify and submit again
    // setFormData({
    //   date: formatDateForInput(new Date()),
    //   weight: '',
    //   bodyFat: '',
    //   calories: '',
    //   notes: '',
    //   photo: null
    // });
    // setImagePreview(null);
  };

  // Always show success status since editing is always allowed
  const status = {
    type: 'success',
    icon: <CheckCircle className="w-5 h-5" />,
    message: 'Update your measurements anytime',
    description: 'You can update weight and body fat as many times as needed. Changes will instantly reflect in your progress charts.'
  };

  return (
    <div className="max-w-2xl mx-auto">
      {/* Status Card */}
      <div className={`card mb-6 ${
        status.type === 'success' ? 'border-green-200 bg-green-50' :
        status.type === 'warning' ? 'border-yellow-200 bg-yellow-50' :
        'border-blue-200 bg-blue-50'
      }`}>
        <div className="flex items-start space-x-3">
          <div className={`${
            status.type === 'success' ? 'text-green-600' :
            status.type === 'warning' ? 'text-yellow-600' :
            'text-blue-600'
          }`}>
            {status.icon}
          </div>
          <div>
            <h3 className={`font-medium ${
              status.type === 'success' ? 'text-green-900' :
              status.type === 'warning' ? 'text-yellow-900' :
              'text-blue-900'
            }`}>
              {status.message}
            </h3>
            <p className={`text-sm mt-1 ${
              status.type === 'success' ? 'text-green-700' :
              status.type === 'warning' ? 'text-yellow-700' :
              'text-blue-700'
            }`}>
              {status.description}
            </p>
          </div>
        </div>
      </div>

      {/* Upload Form */}
      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Date Field */}
        <div>
          <label className="block text-sm font-medium text-neutral-700 mb-2">
            Date
          </label>
          <div className="relative">
            <Calendar className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-neutral-400" />
            <input
              type="date"
              name="date"
              value={formData.date}
              onChange={handleInputChange}
              disabled={!canEdit}
              className={`input-field pl-10 ${!canEdit ? 'bg-neutral-100 cursor-not-allowed' : ''}`}
            />
          </div>
        </div>

        {/* Weight and Body Fat */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium text-neutral-700 mb-2">
              Weight (kg) *
            </label>
            <div className="relative">
              <Weight className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-neutral-400" />
              <input
                type="number"
                name="weight"
                value={formData.weight}
                onChange={handleInputChange}
                disabled={!canEdit}
                step="0.1"
                min="0"
                placeholder="75.5"
                className={`input-field pl-10 ${!canEdit ? 'bg-neutral-100 cursor-not-allowed' : ''} ${errors.weight ? 'border-red-300 focus:ring-red-500 focus:border-red-500' : ''}`}
              />
            </div>
            {errors.weight && (
              <p className="mt-1 text-sm text-red-600">{errors.weight}</p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-neutral-700 mb-2">
              Body Fat (%) *
            </label>
            <div className="relative">
              <Percent className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-neutral-400" />
              <input
                type="number"
                name="bodyFat"
                value={formData.bodyFat}
                onChange={handleInputChange}
                disabled={!canEdit}
                step="0.1"
                min="0"
                max="100"
                placeholder="15.5"
                className={`input-field pl-10 ${!canEdit ? 'bg-neutral-100 cursor-not-allowed' : ''} ${errors.bodyFat ? 'border-red-300 focus:ring-red-500 focus:border-red-500' : ''}`}
              />
            </div>
            {errors.bodyFat && (
              <p className="mt-1 text-sm text-red-600">{errors.bodyFat}</p>
            )}
          </div>
        </div>

        {/* Calories */}
        <div>
          <label className="block text-sm font-medium text-neutral-700 mb-2">
            Calories (optional)
          </label>
          <div className="relative">
            <Flame className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-neutral-400" />
            <input
              type="number"
              name="calories"
              value={formData.calories}
              onChange={handleInputChange}
              disabled={!canEdit}
              min="0"
              max="10000"
              placeholder="2000"
              className={`input-field pl-10 ${!canEdit ? 'bg-neutral-100 cursor-not-allowed' : ''} ${errors.calories ? 'border-red-300 focus:ring-red-500 focus:border-red-500' : ''}`}
            />
          </div>
          {errors.calories && (
            <p className="mt-1 text-sm text-red-600">{errors.calories}</p>
          )}
        </div>

        {/* Photo Upload */}
        <div>
          <label className="block text-sm font-medium text-neutral-700 mb-2">
            Progress Photo (optional)
          </label>
          <div className="space-y-3">
            <div className="relative">
              <input
                type="file"
                id="photo"
                accept="image/*"
                onChange={handleImageChange}
                disabled={!canEdit}
                className="hidden"
              />
              <label
                htmlFor="photo"
                className={`flex items-center justify-center w-full px-4 py-3 border-2 border-dashed rounded-lg cursor-pointer transition-colors ${
                  !canEdit 
                    ? 'border-neutral-300 bg-neutral-100 cursor-not-allowed' 
                    : 'border-neutral-300 hover:border-primary-500 hover:bg-primary-50'
                }`}
              >
                <Camera className="w-5 h-5 mr-2 text-neutral-400" />
                <span className="text-sm text-neutral-600">
                  {imagePreview ? 'Change photo' : 'Upload progress photo'}
                </span>
              </label>
            </div>
            
            {imagePreview && (
              <div className="relative">
                <img
                  src={imagePreview}
                  alt="Progress preview"
                  className="w-full h-48 object-cover rounded-lg"
                />
                <button
                  type="button"
                  onClick={() => {
                    setImagePreview(null);
                    setFormData(prev => ({ ...prev, photo: null }));
                  }}
                  className="absolute top-2 right-2 p-1 bg-red-500 text-white rounded-full hover:bg-red-600"
                >
                  ×
                </button>
              </div>
            )}
          </div>
        </div>

        {/* Notes */}
        <div>
          <label className="block text-sm font-medium text-neutral-700 mb-2">
            Notes (optional)
          </label>
          <div className="relative">
            <FileText className="absolute left-3 top-3 w-5 h-5 text-neutral-400" />
            <textarea
              name="notes"
              value={formData.notes}
              onChange={handleInputChange}
              disabled={!canEdit}
              rows={3}
              placeholder="How are you feeling? Any observations about your progress..."
              className={`input-field pl-10 resize-none ${!canEdit ? 'bg-neutral-100 cursor-not-allowed' : ''}`}
            />
          </div>
        </div>

        {/* Submit Button */}
        <div className="flex justify-end">
          <button
            type="submit"
            disabled={!canEdit || loading}
            className={`btn-primary ${
              !canEdit || loading 
                ? 'opacity-50 cursor-not-allowed' 
                : 'hover:bg-primary-600'
            }`}
          >
            {loading ? 'Saving...' : 'Submit Update'}
          </button>
        </div>
      </form>
    </div>
  );
}

