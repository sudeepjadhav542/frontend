import { render, screen, fireEvent } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { JobIndex } from '../context/job_list_context'; // Adjust the path to your context
import Header from './Header';
import { describe, test, expect, vi } from 'vitest';
import React from 'react';

// Mocking the JobIndex context
const mockJobIndex = {
  selectedOptionlocationSearch: '',
  setSelectedOptionlocationSearch: vi.fn(),
  selectedOptionexperienceSearch: '',
  setSelectedOptionexperienceSearch: vi.fn(),
  selectedOptionquerySearch: '',
  setSelectedOptionquerySearch: vi.fn(),
  searchDataFilters: {},
  setSearchDatafilters: vi.fn(),
  userLogin: false,
  setUserLogin: vi.fn(),
};

describe('Header Component', () => {
  test('renders navigation links and login/register buttons when user is not logged in', () => {
    render(
      <JobIndex.Provider value={mockJobIndex}>
        <MemoryRouter>
          <Header />
        </MemoryRouter>
      </JobIndex.Provider>
    );

    // Check navigation links
    expect(screen.getByText(/Home/i)).toBeInTheDocument();
    expect(screen.getByText(/Jobs/i)).toBeInTheDocument();
    expect(screen.getByText(/Blog/i)).toBeInTheDocument();

    // Check Login and Register buttons
    expect(screen.getAllByText(/Login/i).length).toBeGreaterThan(0);
    expect(screen.getAllByText(/Register/i).length).toBeGreaterThan(0);

    // Check 'For employers' button
    expect(screen.getByText(/For employers/i)).toBeInTheDocument();
  });

  test('renders account menu when user is logged in', () => {
    render(
      <JobIndex.Provider value={{ ...mockJobIndex, userLogin: true }}>
        <MemoryRouter>
          <Header />
        </MemoryRouter>
      </JobIndex.Provider>
    );

    // Check that Account button is rendered
    expect(screen.getByRole('button', { name: /Account/i })).toBeInTheDocument();
  });

  test('logout button works when clicked', () => {
    const setUserLogin = vi.fn();

    render(
      <JobIndex.Provider value={{ ...mockJobIndex, userLogin: true, setUserLogin }}>
        <MemoryRouter>
          <Header />
        </MemoryRouter>
      </JobIndex.Provider>
    );

    // Open the account menu
    fireEvent.click(screen.getByRole('button', { name: /Account/i }));

    // Check Logout button
    const logoutButton = screen.getByText(/Logout/i);
    expect(logoutButton).toBeInTheDocument();

    // Simulate logout button click
    fireEvent.click(logoutButton);

    // Ensure setUserLogin is called with false
    expect(setUserLogin).toHaveBeenCalledWith(false);
  });
});
