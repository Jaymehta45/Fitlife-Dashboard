// Dashboard Context for centralized state management
// TODO: Replace localStorage calls with Supabase queries
// Key integration points:
// - addUploadEntry: supabase.from('uploads').insert(entry)
// - getEntries: supabase.from('uploads').select('*').order('date')
// - isDateLocked: Check against database instead of localStorage

import React, { createContext, useContext, useReducer, useEffect } from 'react';
import { 
  mockUser, 
  mockWeightHistory, 
  mockWorkouts, 
  mockMacros, 
  mockPrograms, 
  mockActivityFeed,
  getRecentWeightData,
  getWorkoutFrequencyData,
  getCurrentWeekData
} from '../data/mockData';
import { 
  getUploadLockData, 
  setUploadLockData, 
  addSubmittedDate,
  getUserPreferences,
  setUserPreferences,
  getTheme,
  setTheme,
  getUpdateDay,
  setUpdateDay
} from '../utils/storage';
import { 
  getNextUpdateDate, 
  isDateLocked as checkDateLocked, 
  isTodayUpdateDay,
  formatDateForInput 
} from '../utils/dateUtils';

const DashboardContext = createContext();

// Action types
const ACTIONS = {
  SET_LOADING: 'SET_LOADING',
  SET_USER: 'SET_USER',
  SET_WEIGHT_HISTORY: 'SET_WEIGHT_HISTORY',
  SET_WORKOUTS: 'SET_WORKOUTS',
  SET_MACROS: 'SET_MACROS',
  SET_PROGRAMS: 'SET_PROGRAMS',
  SET_ACTIVITY_FEED: 'SET_ACTIVITY_FEED',
  ADD_UPLOAD_ENTRY: 'ADD_UPLOAD_ENTRY',
  SET_THEME: 'SET_THEME',
  SET_UPDATE_DAY: 'SET_UPDATE_DAY',
  SET_LOCK_DATA: 'SET_LOCK_DATA',
  SHOW_TOAST: 'SHOW_TOAST',
  HIDE_TOAST: 'HIDE_TOAST'
};

// Initial state
const initialState = {
  loading: false,
  user: mockUser,
  weightHistory: mockWeightHistory,
  workouts: mockWorkouts,
  macros: mockMacros,
  programs: mockPrograms,
  activityFeed: mockActivityFeed,
  lockData: getUploadLockData(),
  theme: getTheme(),
  updateDay: getUpdateDay(),
  toast: {
    show: false,
    message: '',
    type: 'success'
  }
};

// Reducer
function dashboardReducer(state, action) {
  switch (action.type) {
    case ACTIONS.SET_LOADING:
      return { ...state, loading: action.payload };
    
    case ACTIONS.SET_USER:
      return { ...state, user: action.payload };
    
    case ACTIONS.SET_WEIGHT_HISTORY:
      return { ...state, weightHistory: action.payload };
    
    case ACTIONS.SET_WORKOUTS:
      return { ...state, workouts: action.payload };
    
    case ACTIONS.SET_MACROS:
      return { ...state, macros: action.payload };
    
    case ACTIONS.SET_PROGRAMS:
      return { ...state, programs: action.payload };
    
    case ACTIONS.SET_ACTIVITY_FEED:
      return { ...state, activityFeed: action.payload };
    
    case ACTIONS.ADD_UPLOAD_ENTRY:
      const newEntry = action.payload;
      const updatedHistory = [...state.weightHistory, newEntry].sort(
        (a, b) => new Date(a.date) - new Date(b.date)
      );
      return { ...state, weightHistory: updatedHistory };
    
    case ACTIONS.SET_THEME:
      return { ...state, theme: action.payload };
    
    case ACTIONS.SET_UPDATE_DAY:
      return { ...state, updateDay: action.payload };
    
    case ACTIONS.SET_LOCK_DATA:
      return { ...state, lockData: action.payload };
    
    case ACTIONS.SHOW_TOAST:
      return { 
        ...state, 
        toast: { 
          show: true, 
          message: action.payload.message, 
          type: action.payload.type || 'success' 
        } 
      };
    
    case ACTIONS.HIDE_TOAST:
      return { ...state, toast: { ...state.toast, show: false } };
    
    default:
      return state;
  }
}

// Context Provider
export function DashboardProvider({ children }) {
  const [state, dispatch] = useReducer(dashboardReducer, initialState);

  // Load initial data from localStorage
  useEffect(() => {
    const preferences = getUserPreferences();
    dispatch({ type: ACTIONS.SET_THEME, payload: preferences.theme });
    dispatch({ type: ACTIONS.SET_UPDATE_DAY, payload: preferences.updateDay });
  }, []);

  // Actions
  const addUploadEntry = async (entry) => {
    try {
      dispatch({ type: ACTIONS.SET_LOADING, payload: true });
      
      // TODO: Replace with Supabase insert
      // const { data, error } = await supabase
      //   .from('uploads')
      //   .insert([entry])
      //   .select();
      
      // if (error) throw error;
      
      // For now, add to local state
      dispatch({ type: ACTIONS.ADD_UPLOAD_ENTRY, payload: entry });
      
      // Update lock data
      const dateString = entry.date;
      addSubmittedDate(dateString);
      
      // Update lock data in state
      const newLockData = getUploadLockData();
      dispatch({ type: ACTIONS.SET_LOCK_DATA, payload: newLockData });
      
      // Show success toast
      const nextUpdate = getNextUpdateDate(new Date(), state.updateDay);
      dispatch({ 
        type: ACTIONS.SHOW_TOAST, 
        payload: { 
          message: `Entry saved — locked until ${nextUpdate.toLocaleDateString()}`, 
          type: 'success' 
        } 
      });
      
    } catch (error) {
      console.error('Error adding upload entry:', error);
      dispatch({ 
        type: ACTIONS.SHOW_TOAST, 
        payload: { 
          message: 'Error saving entry. Please try again.', 
          type: 'error' 
        } 
      });
    } finally {
      dispatch({ type: ACTIONS.SET_LOADING, payload: false });
    }
  };

  const getEntries = () => {
    // TODO: Replace with Supabase query
    // return supabase.from('uploads').select('*').order('date', { ascending: true });
    return state.weightHistory;
  };

  const isDateLocked = (date) => {
    return checkDateLocked(date, state.lockData);
  };

  const nextUpdateDate = () => {
    return getNextUpdateDate(new Date(), state.updateDay);
  };

  const canSubmitToday = () => {
    const today = new Date();
    return isTodayUpdateDay(today, state.updateDay) && !checkDateLocked(today, state.lockData);
  };

  const updateTheme = (theme) => {
    setTheme(theme);
    dispatch({ type: ACTIONS.SET_THEME, payload: theme });
    // Update body class for CSS theme switching
    document.body.className = `theme-${theme}`;
  };

  const updateUpdateDay = (day) => {
    setUpdateDay(day);
    dispatch({ type: ACTIONS.SET_UPDATE_DAY, payload: day });
  };

  const hideToast = () => {
    dispatch({ type: ACTIONS.HIDE_TOAST });
  };

  // Computed values
  const recentWeightData = getRecentWeightData();
  const workoutFrequencyData = getWorkoutFrequencyData();
  const currentWeekData = getCurrentWeekData();
  
  const weeklyStats = {
    workouts: currentWeekData.length,
    calories: currentWeekData.reduce((sum, w) => sum + w.calories, 0),
    activeProgram: 'Strength Training',
    weeklyGoal: 5
  };

  const value = {
    ...state,
    // Actions
    addUploadEntry,
    getEntries,
    isDateLocked,
    nextUpdateDate,
    canSubmitToday,
    updateTheme,
    updateUpdateDay,
    hideToast,
    // Computed values
    recentWeightData,
    workoutFrequencyData,
    weeklyStats
  };

  return (
    <DashboardContext.Provider value={value}>
      {children}
    </DashboardContext.Provider>
  );
}

// Custom hook to use dashboard context
export function useDashboard() {
  const context = useContext(DashboardContext);
  if (context === undefined) {
    throw new Error('useDashboard must be used within a DashboardProvider');
  }
  return context;
}
