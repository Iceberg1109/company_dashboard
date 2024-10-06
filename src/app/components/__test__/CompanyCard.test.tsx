import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import CompanyCard from '../CompanyCard'; // Adjust the import path as necessary

// Mock Company Data
const mockCompany = {
  id: '1',
  name: 'Test Company',
  email: 'test@company.com',
  logoUrl: 'https://via.placeholder.com/150',
};

describe('CompanyCard Component', () => {
  it('renders company name, email, and logo correctly', () => {
    render(
      <CompanyCard
        {...mockCompany}
        isSelected={false}
        onSelect={jest.fn()}
      />
    );

    // Check if name is rendered
    expect(screen.getByText(mockCompany.name)).toBeInTheDocument();

    // Check if email is rendered
    expect(screen.getByText(mockCompany.email)).toBeInTheDocument();

    // Check if the logo URL is correct
    const logoImg = screen.getByRole('img');
    expect(logoImg).toHaveAttribute('src', mockCompany.logoUrl);
  });

  it('uses default logo if no logoUrl is provided', () => {
    render(
      <CompanyCard
        {...mockCompany}
        logoUrl={undefined} // Simulating missing logoUrl
        isSelected={false}
        onSelect={jest.fn()}
      />
    );
  
    const logoImg = screen.getByAltText(`${mockCompany.name} logo`);
    expect(logoImg).toHaveAttribute('src', '/default.png');
  });

  it('checkbox is checked when isSelected is true', () => {
    render(
      <CompanyCard
        {...mockCompany}
        isSelected={true}
        onSelect={jest.fn()}
      />
    );

    const checkbox = screen.getByRole('checkbox');
    expect(checkbox).toBeChecked();
  });

  it('checkbox is not checked when isSelected is false', () => {
    render(
      <CompanyCard
        {...mockCompany}
        isSelected={false}
        onSelect={jest.fn()}
      />
    );

    const checkbox = screen.getByRole('checkbox');
    expect(checkbox).not.toBeChecked();
  });

  it('calls onSelect when checkbox is clicked', () => {
    const mockOnSelect = jest.fn();

    render(
      <CompanyCard
        {...mockCompany}
        isSelected={false}
        onSelect={mockOnSelect}
      />
    );

    const checkbox = screen.getByRole('checkbox');
    fireEvent.click(checkbox);

    // Check if onSelect has been called with the correct company ID
    expect(mockOnSelect).toHaveBeenCalledWith(mockCompany.id);
  });
});