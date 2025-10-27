// LocalStorage utility functions
// TODO: Replace with Supabase storage in production

const STORAGE_KEYS = {
  UPLOADS: 'fitlife_uploads',
  USER_PREFERENCES: 'fitlife_user_preferences',
  THEME: 'fitlife_theme',
  UPDATE_DAY: 'fitlife_update_day'
};

/**
 * Get data from localStorage with error handling
 * @param {string} key - Storage key
 * @param {*} defaultValue - Default value if key doesn't exist
 * @returns {*} Parsed data or default value
 */
export const getStorageItem = (key, defaultValue = null) => {
  try {
    const item = localStorage.getItem(key);
    return item ? JSON.parse(item) : defaultValue;
  } catch (error) {
    console.error(`Error reading from localStorage key "${key}":`, error);
    return defaultValue;
  }
};

/**
 * Set data to localStorage with error handling
 * @param {string} key - Storage key
 * @param {*} value - Value to store
 * @returns {boolean} Success status
 */
export const setStorageItem = (key, value) => {
  try {
    localStorage.setItem(key, JSON.stringify(value));
    return true;
  } catch (error) {
    console.error(`Error writing to localStorage key "${key}":`, error);
    return false;
  }
};

/**
 * Remove data from localStorage
 * @param {string} key - Storage key
 * @returns {boolean} Success status
 */
export const removeStorageItem = (key) => {
  try {
    localStorage.removeItem(key);
    return true;
  } catch (error) {
    console.error(`Error removing localStorage key "${key}":`, error);
    return false;
  }
};

// Upload lock data functions
export const getUploadLockData = () => {
  return getStorageItem(STORAGE_KEYS.UPLOADS, {
    submittedDates: [],
    nextUnlockDate: null
  });
};

export const setUploadLockData = (data) => {
  return setStorageItem(STORAGE_KEYS.UPLOADS, data);
};

export const addSubmittedDate = (dateString) => {
  const lockData = getUploadLockData();
  if (!lockData.submittedDates.includes(dateString)) {
    lockData.submittedDates.push(dateString);
    setUploadLockData(lockData);
  }
};

// User preferences functions
export const getUserPreferences = () => {
  return getStorageItem(STORAGE_KEYS.USER_PREFERENCES, {
    theme: 'monotone',
    updateDay: 26,
    notifications: true
  });
};

export const setUserPreferences = (preferences) => {
  return setStorageItem(STORAGE_KEYS.USER_PREFERENCES, preferences);
};

// Theme functions
export const getTheme = () => {
  return getStorageItem(STORAGE_KEYS.THEME, 'monotone');
};

export const setTheme = (theme) => {
  return setStorageItem(STORAGE_KEYS.THEME, theme);
};

// Update day functions
export const getUpdateDay = () => {
  return getStorageItem(STORAGE_KEYS.UPDATE_DAY, 26);
};

export const setUpdateDay = (day) => {
  return setStorageItem(STORAGE_KEYS.UPDATE_DAY, day);
};

// Clear all app data
export const clearAllData = () => {
  Object.values(STORAGE_KEYS).forEach(key => {
    removeStorageItem(key);
  });
};

