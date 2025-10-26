// Programs page displaying available fitness programs
// TODO: Add program filtering and search functionality
// TODO: Add program detail modal
// TODO: Integrate with payment system for program enrollment

import React, { useState } from 'react';
import { useDashboard } from '../context/DashboardContext';
import ProgramCard from '../components/ProgramCard';
import { Search, Filter, Grid, List } from 'lucide-react';

export default function ProgramsPage() {
  const { programs } = useDashboard();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [viewMode, setViewMode] = useState('grid');

  const categories = ['all', 'Strength', 'Cardio', 'Weight Loss'];

  const filteredPrograms = programs.filter(program => {
    const matchesSearch = program.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         program.description.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = selectedCategory === 'all' || program.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const handleViewDetails = (program) => {
    // TODO: Open program detail modal
    console.log('View details for:', program.title);
    alert(`View details for ${program.title} - This would open a detailed modal in production`);
  };

  const handleJoinProgram = (program) => {
    // TODO: Integrate with Razorpay payment system
    console.log('Join program:', program.title);
    alert(`Join ${program.title} - This would redirect to payment in production`);
  };

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div>
        <h1 className="text-3xl font-bold text-neutral-900">Fitness Programs</h1>
        <p className="text-neutral-600 mt-1">
          Choose from our curated collection of fitness programs
        </p>
      </div>

      {/* Search and Filters */}
      <div className="card">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between space-y-4 md:space-y-0">
          {/* Search */}
          <div className="flex-1 max-w-md">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-neutral-400" />
              <input
                type="text"
                placeholder="Search programs..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="input-field pl-10"
              />
            </div>
          </div>

          {/* Category Filter */}
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-2">
              <Filter className="w-5 h-5 text-neutral-400" />
              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="input-field"
              >
                {categories.map(category => (
                  <option key={category} value={category}>
                    {category === 'all' ? 'All Categories' : category}
                  </option>
                ))}
              </select>
            </div>

            {/* View Mode Toggle */}
            <div className="flex items-center space-x-1 border border-neutral-300 rounded-lg p-1">
              <button
                onClick={() => setViewMode('grid')}
                className={`p-2 rounded ${viewMode === 'grid' ? 'bg-primary-100 text-primary-600' : 'text-neutral-400 hover:text-neutral-600'}`}
              >
                <Grid className="w-4 h-4" />
              </button>
              <button
                onClick={() => setViewMode('list')}
                className={`p-2 rounded ${viewMode === 'list' ? 'bg-primary-100 text-primary-600' : 'text-neutral-400 hover:text-neutral-600'}`}
              >
                <List className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Programs Grid */}
      <div className={`grid gap-6 ${
        viewMode === 'grid' 
          ? 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3' 
          : 'grid-cols-1'
      }`}>
        {filteredPrograms.map((program) => (
          <ProgramCard
            key={program.id}
            program={program}
            onViewDetails={handleViewDetails}
            onJoinProgram={handleJoinProgram}
          />
        ))}
      </div>

      {/* Empty State */}
      {filteredPrograms.length === 0 && (
        <div className="text-center py-12">
          <div className="w-24 h-24 bg-neutral-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <Search className="w-12 h-12 text-neutral-400" />
          </div>
          <h3 className="text-lg font-medium text-neutral-900 mb-2">No programs found</h3>
          <p className="text-neutral-500">
            Try adjusting your search or filter criteria
          </p>
        </div>
      )}

      {/* Results Count */}
      <div className="text-sm text-neutral-500">
        Showing {filteredPrograms.length} of {programs.length} programs
      </div>
    </div>
  );
}
