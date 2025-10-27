// Unit tests for upload lock logic
// TODO: Add more comprehensive test cases
// TODO: Add integration tests with DashboardContext

import { describe, it, expect, beforeEach, vi } from 'vitest';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import { DashboardProvider } from '../context/DashboardContext';
import UploadForm from '../components/UploadForm';
import { 
  getNextUpdateDate, 
  isDateLocked, 
  isTodayUpdateDay,
  formatDateForInput 
} from '../utils/dateUtils';

// Mock localStorage
const localStorageMock = {
  getItem: vi.fn(),
  setItem: vi.fn(),
  removeItem: vi.fn(),
  clear: vi.fn(),
};
Object.defineProperty(window, 'localStorage', {
  value: localStorageMock,
});

// Test wrapper component
const TestWrapper = ({ children }) => (
  <BrowserRouter>
    <DashboardProvider>
      {children}
    </DashboardProvider>
  </BrowserRouter>
);

describe('Upload Lock Logic', () => {
  beforeEach(() => {
    vi.clearAllMocks();
    localStorageMock.getItem.mockReturnValue(null);
  });

  describe('Date Utilities', () => {
    it('should calculate next update date correctly', () => {
      const today = new Date('2024-04-15');
      const updateDay = 26;
      const nextUpdate = getNextUpdateDate(today, updateDay);
      
      expect(nextUpdate.getDate()).toBe(26);
      expect(nextUpdate.getMonth()).toBe(3); // April (0-indexed)
      expect(nextUpdate.getFullYear()).toBe(2024);
    });

    it('should calculate next update date for next month when past update day', () => {
      const today = new Date('2024-04-30');
      const updateDay = 26;
      const nextUpdate = getNextUpdateDate(today, updateDay);
      
      expect(nextUpdate.getDate()).toBe(26);
      expect(nextUpdate.getMonth()).toBe(4); // May (0-indexed)
      expect(nextUpdate.getFullYear()).toBe(2024);
    });

    it('should check if today is update day correctly', () => {
      const today = new Date('2024-04-26');
      const updateDay = 26;
      
      expect(isTodayUpdateDay(today, updateDay)).toBe(true);
    });

    it('should check if date is locked correctly', () => {
      const date = new Date('2024-04-26');
      const lockData = {
        submittedDates: ['2024-04-26'],
        nextUnlockDate: '2024-05-26'
      };
      
      expect(isDateLocked(date, lockData)).toBe(true);
    });

    it('should return false for unlocked date', () => {
      const date = new Date('2024-04-25');
      const lockData = {
        submittedDates: ['2024-04-26'],
        nextUnlockDate: '2024-05-26'
      };
      
      expect(isDateLocked(date, lockData)).toBe(false);
    });
  });

  describe('Upload Form Lock Behavior', () => {
    it('should show locked message when not update day', () => {
      // Mock current date to not be update day
      vi.setSystemTime(new Date('2024-04-15'));
      
      render(
        <TestWrapper>
          <UploadForm />
        </TestWrapper>
      );

      expect(screen.getByText(/Next update available/)).toBeInTheDocument();
    });

    it('should show locked message when date already submitted', () => {
      // Mock current date to be update day
      vi.setSystemTime(new Date('2024-04-26'));
      
      // Mock localStorage to return submitted date
      localStorageMock.getItem.mockReturnValue(JSON.stringify({
        submittedDates: ['2024-04-26'],
        nextUnlockDate: '2024-05-26'
      }));

      render(
        <TestWrapper>
          <UploadForm />
        </TestWrapper>
      );

      expect(screen.getByText(/Today's entry has already been submitted/)).toBeInTheDocument();
    });

    it('should show editable form when it is update day and not submitted', () => {
      // Mock current date to be update day
      vi.setSystemTime(new Date('2024-04-26'));
      
      // Mock localStorage to return no submitted dates
      localStorageMock.getItem.mockReturnValue(JSON.stringify({
        submittedDates: [],
        nextUnlockDate: null
      }));

      render(
        <TestWrapper>
          <UploadForm />
        </TestWrapper>
      );

      expect(screen.getByText(/Ready to update your progress/)).toBeInTheDocument();
      expect(screen.getByRole('button', { name: /Submit Update/ })).not.toBeDisabled();
    });

    it('should disable form fields when locked', () => {
      // Mock current date to not be update day
      vi.setSystemTime(new Date('2024-04-15'));

      render(
        <TestWrapper>
          <UploadForm />
        </TestWrapper>
      );

      const weightInput = screen.getByPlaceholderText('75.5');
      const bodyFatInput = screen.getByPlaceholderText('15.5');
      
      expect(weightInput).toBeDisabled();
      expect(bodyFatInput).toBeDisabled();
    });

    it('should enable form fields when unlocked', () => {
      // Mock current date to be update day
      vi.setSystemTime(new Date('2024-04-26'));
      
      // Mock localStorage to return no submitted dates
      localStorageMock.getItem.mockReturnValue(JSON.stringify({
        submittedDates: [],
        nextUnlockDate: null
      }));

      render(
        <TestWrapper>
          <UploadForm />
        </TestWrapper>
      );

      const weightInput = screen.getByPlaceholderText('75.5');
      const bodyFatInput = screen.getByPlaceholderText('15.5');
      
      expect(weightInput).not.toBeDisabled();
      expect(bodyFatInput).not.toBeDisabled();
    });
  });

  describe('Form Submission', () => {
    it('should validate required fields', async () => {
      // Mock current date to be update day
      vi.setSystemTime(new Date('2024-04-26'));
      
      localStorageMock.getItem.mockReturnValue(JSON.stringify({
        submittedDates: [],
        nextUnlockDate: null
      }));

      render(
        <TestWrapper>
          <UploadForm />
        </TestWrapper>
      );

      const submitButton = screen.getByRole('button', { name: /Submit Update/ });
      fireEvent.click(submitButton);

      await waitFor(() => {
        expect(screen.getByText(/Weight is required/)).toBeInTheDocument();
        expect(screen.getByText(/Body fat percentage must be between 0 and 100/)).toBeInTheDocument();
      });
    });

    it('should submit form with valid data', async () => {
      // Mock current date to be update day
      vi.setSystemTime(new Date('2024-04-26'));
      
      localStorageMock.getItem.mockReturnValue(JSON.stringify({
        submittedDates: [],
        nextUnlockDate: null
      }));

      render(
        <TestWrapper>
          <UploadForm />
        </TestWrapper>
      );

      // Fill in form data
      fireEvent.change(screen.getByPlaceholderText('75.5'), { target: { value: '75.0' } });
      fireEvent.change(screen.getByPlaceholderText('15.5'), { target: { value: '15.0' } });
      fireEvent.change(screen.getByPlaceholderText('2000'), { target: { value: '2000' } });

      const submitButton = screen.getByRole('button', { name: /Submit Update/ });
      fireEvent.click(submitButton);

      await waitFor(() => {
        expect(localStorageMock.setItem).toHaveBeenCalled();
      });
    });
  });
});

