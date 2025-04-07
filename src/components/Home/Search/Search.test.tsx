import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { JobIndex } from "../../context/job_list_context";
import { vi } from 'vitest';
import Search from './Search';
import SearchLocation from './SearchLocation'; // Ensure correct import
import React from 'react';
import { API_GET, API_POST } from '../../../utils/api_structure';

// Mocking API calls
vi.mock('../../../utils/api_structure', () => ({
  API_POST: vi.fn(),
  API_GET: vi.fn(),
}));

const mockCityData = [
    { value: 1, label: 'Mumbai' },
    { value: 2, label: 'Delhi' },
    { value: 3, label: 'Bangalore' },
  ];

// Mocking SearchLocation component
vi.mock('./SearchLocation', () => ({
  __esModule: true,
  default: ({ options, name, selectedOption, setSelected, onchange, id }) => (
    <div>
      <select
        data-testid={id}
        onChange={(e) => setSelected(e.target.value)}
        value={selectedOption}
      >
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
    </div>
  )
}));

const jsonData = mockCityData;

// Mock JobIndex Context
const mockJobIndex = {
  selectedOptionlocationSearch: '',
  setSelectedOptionlocationSearch: vi.fn(),
  selectedOptionexperienceSearch: '',
  setSelectedOptionexperienceSearch: vi.fn(),
  selectedOptionquerySearch: '',
  setSelectedOptionquerySearch: vi.fn(),
  jobdata: [],
  setJobs: vi.fn(),
  job_index: {},
  setJobIndex: vi.fn(),
  searchDataFilters: {},
  setSearchDatafilters: vi.fn(),
};

describe('Search Component', () => {
  beforeEach(() => {
    // Mock API GET call for the search data
    vi.mocked(API_GET).mockResolvedValueOnce({
      result: [{ job_title: 'Job 1', job_org: 'Company A' }, { job_title: 'Job 2', job_org: 'Company B' }],
      status: 200,
    });

    // Mock API POST call for cities data
    vi.mocked(API_POST).mockResolvedValueOnce({
      result: ['Mumbai', 'Delhi', 'Bangalore'],
      status: 200,
    });
  });

  test('renders Search component and dropdowns', async () => {
    render(
      <JobIndex.Provider value={mockJobIndex}>
        <Search />
      </JobIndex.Provider>
    );

    // Wait for API responses and check the component rendering
    await waitFor(() => {
      expect(screen.getByTestId('searchQuery')).toBeInTheDocument();
      expect(screen.getByTestId('experience')).toBeInTheDocument();
      expect(screen.getByTestId('location')).toBeInTheDocument();
    });

    // Check if the location dropdown contains the cities
    const locationDropdown = screen.getByTestId('location');
    const options = locationDropdown.querySelectorAll('option');

    expect(options).toHaveLength(3);
    expect(options[0]).toHaveTextContent('Mumbai');
    expect(options[1]).toHaveTextContent('Delhi');
    expect(options[2]).toHaveTextContent('Bangalore');
  });

  test('fires search function when the search button is clicked', async () => {
    render(
      <JobIndex.Provider value={mockJobIndex}>
        <Search />
      </JobIndex.Provider>
    );

    // Fire a click event on the search button
    fireEvent.click(screen.getByText('Search'));

    // Ensure the sendata function is called
    await waitFor(() => {
      expect(mockJobIndex.setJobs).toHaveBeenCalled();
      expect(mockJobIndex.setJobIndex).toHaveBeenCalled();
    });
  });

  test('updates context state when selecting options', async () => {
    render(
      <JobIndex.Provider value={mockJobIndex}>
        <Search />
      </JobIndex.Provider>
    );

    // Simulate selecting an option in the "Companies/Designation" dropdown
    fireEvent.change(screen.getByTestId('searchQuery'), { target: { value: 'Job 1' } });

    // Check that the selected value has been updated in the context
    expect(mockJobIndex.setSelectedOptionquerySearch).toHaveBeenCalledWith('Job 1');
  });
});
