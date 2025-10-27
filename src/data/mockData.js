// Mock data for FitLife Dashboard
// TODO: Replace with Supabase queries in DashboardContext

export const mockUser = {
  id: 'user_123',
  name: 'Alex Johnson',
  email: 'alex@example.com',
  avatar: null,
  updateDay: 26, // Configurable update day of the month
  theme: 'dribbble', // 'dribbble' or 'light'
};

export const mockWeightHistory = [
  // Start with empty history - user will add their own entries
];

export const mockWorkouts = [
  { id: 1, date: '2024-04-25', type: 'Strength', duration: 60, calories: 450, exercises: ['Bench Press', 'Squats', 'Deadlifts'] },
  { id: 2, date: '2024-04-24', type: 'Cardio', duration: 30, calories: 300, exercises: ['Running', 'Cycling'] },
  { id: 3, date: '2024-04-23', type: 'Strength', duration: 45, calories: 350, exercises: ['Pull-ups', 'Rows', 'Shoulder Press'] },
  { id: 4, date: '2024-04-22', type: 'Yoga', duration: 40, calories: 150, exercises: ['Sun Salutation', 'Warrior Poses'] },
  { id: 5, date: '2024-04-21', type: 'Cardio', duration: 25, calories: 250, exercises: ['HIIT', 'Burpees'] },
  { id: 6, date: '2024-04-20', type: 'Strength', duration: 50, calories: 400, exercises: ['Leg Press', 'Lunges', 'Calf Raises'] },
  { id: 7, date: '2024-04-19', type: 'Rest', duration: 0, calories: 0, exercises: [] },
];

export const mockMacros = {
  protein: 150,
  carbs: 200,
  fat: 80,
  calories: 1920,
  goal: {
    protein: 160,
    carbs: 180,
    fat: 70,
    calories: 1800,
  }
};

export const mockPrograms = [
  {
    id: 1,
    title: 'Strength Training',
    category: 'Strength',
    description: 'Build muscle mass and increase strength with progressive overload training.',
    duration: '12 weeks',
    difficulty: 'Intermediate',
    features: [
      'Progressive weight training',
      'Compound movement focus',
      '3-4 sessions per week',
      'Nutrition guidance',
      'Form coaching videos'
    ],
    price: 99,
    image: '/api/placeholder/300/200',
    rating: 4.8,
    reviews: 1247
  },
  {
    id: 2,
    title: 'Cardio Fitness',
    category: 'Cardio',
    description: 'Improve cardiovascular health and endurance with varied cardio workouts.',
    duration: '8 weeks',
    difficulty: 'Beginner',
    features: [
      'HIIT workouts',
      'Steady-state cardio',
      'Heart rate monitoring',
      'Recovery protocols',
      'Flexible scheduling'
    ],
    price: 79,
    image: '/api/placeholder/300/200',
    rating: 4.6,
    reviews: 892
  },
  {
    id: 3,
    title: 'Weight Loss',
    category: 'Weight Loss',
    description: 'Comprehensive program combining diet and exercise for sustainable weight loss.',
    duration: '16 weeks',
    difficulty: 'All Levels',
    features: [
      'Calorie deficit planning',
      'Meal prep guides',
      'Workout variety',
      'Progress tracking',
      'Community support'
    ],
    price: 149,
    image: '/api/placeholder/300/200',
    rating: 4.9,
    reviews: 2156
  }
];

export const mockActivityFeed = [
  {
    id: 1,
    type: 'workout',
    title: 'Strength Training Completed',
    description: '60 min session with 450 calories burned',
    timestamp: '2024-04-25T18:30:00Z',
    icon: '💪'
  },
  {
    id: 2,
    type: 'weight',
    title: 'Weight Updated',
    description: 'New weight: 71.8 kg (-0.2 kg from last week)',
    timestamp: '2024-04-26T09:15:00Z',
    icon: '⚖️'
  },
  {
    id: 3,
    type: 'goal',
    title: 'Weekly Goal Achieved',
    description: 'Completed 5 workouts this week!',
    timestamp: '2024-04-24T20:00:00Z',
    icon: '🎯'
  },
  {
    id: 4,
    type: 'nutrition',
    title: 'Macro Target Hit',
    description: 'Perfect protein intake today',
    timestamp: '2024-04-23T21:30:00Z',
    icon: '🥗'
  },
  {
    id: 5,
    type: 'milestone',
    title: 'New Personal Record',
    description: 'Deadlift: 120kg x 5 reps',
    timestamp: '2024-04-22T19:45:00Z',
    icon: '🏆'
  }
];

// Helper function to get current week's data
export const getCurrentWeekData = () => {
  const today = new Date();
  const weekStart = new Date(today);
  weekStart.setDate(today.getDate() - today.getDay());
  
  return mockWorkouts.filter(workout => {
    const workoutDate = new Date(workout.date);
    return workoutDate >= weekStart && workoutDate <= today;
  });
};

// Helper function to get recent weight data (last 12 entries)
export const getRecentWeightData = () => {
  return mockWeightHistory.slice(-12);
};

// Helper function to get workout frequency data
export const getWorkoutFrequencyData = () => {
  // Create realistic workout frequency data with varying patterns
  return [
    { week: 'Week 1', workouts: 3, calories: 1200 },
    { week: 'Week 2', workouts: 5, calories: 1850 },
    { week: 'Week 3', workouts: 4, calories: 1500 },
    { week: 'Week 4', workouts: 6, calories: 2100 },
  ];
};
