// Date utility functions for upload lock logic
// TODO: Consider timezone handling for production use

/**
 * Get the next update date based on the current date and update day
 * @param {Date} today - Current date
 * @param {number} updateDay - Day of month when updates are allowed (1-31)
 * @returns {Date} Next available update date
 */
export const getNextUpdateDate = (today, updateDay) => {
  const currentMonth = today.getMonth();
  const currentYear = today.getFullYear();
  const currentDay = today.getDate();
  
  // If today is before the update day this month, next update is this month
  if (currentDay < updateDay) {
    return new Date(currentYear, currentMonth, updateDay);
  }
  
  // Otherwise, next update is next month
  const nextMonth = currentMonth === 11 ? 0 : currentMonth + 1;
  const nextYear = currentMonth === 11 ? currentYear + 1 : currentYear;
  
  return new Date(nextYear, nextMonth, updateDay);
};

/**
 * Check if a specific date is locked (already submitted)
 * @param {Date} date - Date to check
 * @param {Object} lockData - Lock data from localStorage
 * @returns {boolean} True if date is locked
 */
export const isDateLocked = (date, lockData) => {
  if (!lockData || !lockData.submittedDates) return false;
  
  const dateString = date.toISOString().split('T')[0];
  return lockData.submittedDates.includes(dateString);
};

/**
 * Check if today is the update day
 * @param {Date} today - Current date
 * @param {number} updateDay - Day of month when updates are allowed
 * @returns {boolean} True if today is update day
 */
export const isTodayUpdateDay = (today, updateDay) => {
  return today.getDate() === updateDay;
};

/**
 * Format date for display
 * @param {Date} date - Date to format
 * @returns {string} Formatted date string
 */
export const formatDate = (date) => {
  return date.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });
};

/**
 * Format date for form input (YYYY-MM-DD)
 * @param {Date} date - Date to format
 * @returns {string} Formatted date string for input
 */
export const formatDateForInput = (date) => {
  return date.toISOString().split('T')[0];
};

/**
 * Get date from input string
 * @param {string} dateString - Date string in YYYY-MM-DD format
 * @returns {Date} Date object
 */
export const getDateFromInput = (dateString) => {
  return new Date(dateString + 'T00:00:00');
};
