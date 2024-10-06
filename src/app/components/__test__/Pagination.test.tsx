import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import Pagination from '../Pagination';
import { ChevronLeftIcon, ChevronRightIcon } from '@heroicons/react/20/solid';

// Mocking Icons
jest.mock('@heroicons/react/20/solid', () => ({
  ChevronLeftIcon: jest.fn(() => <svg data-testid="ChevronLeftIcon" />),
  ChevronRightIcon: jest.fn(() => <svg data-testid="ChevronRightIcon" />),
}));

describe('Pagination Component', () => {
  const defaultProps = {
    currentPage: 2,
    total: 50,
    pageSize: 10,
    onPageChange: jest.fn(),
  };

  it('renders correctly', () => {
    render(<Pagination {...defaultProps} />);

    // Check if page number buttons are rendered correctly
    expect(screen.getByText('1')).toBeInTheDocument();
    expect(screen.getByText('2')).toBeInTheDocument(); // Current page
    expect(screen.getByText('3')).toBeInTheDocument();
    expect(screen.getByText('5')).toBeInTheDocument();

    // Check for Chevron icons
    expect(screen.getByTestId('ChevronLeftIcon')).toBeInTheDocument();
    expect(screen.getByTestId('ChevronRightIcon')).toBeInTheDocument();

    // Check if info text is rendered correctlyexpect(
    expect(
      screen.getByText((content, element) => {
        const hasText = (node: Element|null) => node?.textContent === 'Showing 11 to 20 of 50 results';
        const elementHasText = hasText(element);
        const childrenDontHaveText = Array.from(element?.children || []).every(child => !hasText(child));
        return elementHasText && childrenDontHaveText;
      })
    ).toBeInTheDocument();
  });

  it('calls onPageChange when previous button is clicked', () => {
    render(<Pagination {...defaultProps} currentPage={2} />);

    // Simulate previous button click
    const prevBtns = screen.getAllByText('Previous'); // one for desktop and the other for mobile
    fireEvent.click(prevBtns[0]);
    expect(defaultProps.onPageChange).toHaveBeenCalledWith(1);
    fireEvent.click(prevBtns[1]);
    expect(defaultProps.onPageChange).toHaveBeenCalledWith(1);
  });

  it('calls onPageChange when next button is clicked', () => {
    render(<Pagination {...defaultProps} currentPage={2} />);

    // Simulate next button click
    const nextBtns = screen.getAllByText('Next'); // one for desktop and the other for mobile
    fireEvent.click(nextBtns[0]);
    expect(defaultProps.onPageChange).toHaveBeenCalledWith(3);
    fireEvent.click(nextBtns[1]);
    expect(defaultProps.onPageChange).toHaveBeenCalledWith(3);
  });

  it('disables previous button on the first page', () => {
    render(<Pagination {...defaultProps} currentPage={1} />);

    // Check that previous button is disabled
    const prevBtns = screen.getAllByRole('button', { name: 'Previous' }); // one for desktop and the other for mobile
    expect(prevBtns[0]).toBeDisabled();
    expect(prevBtns[1]).toBeDisabled();
  });

  it('disables next button on the last page', () => {
    render(<Pagination {...defaultProps} currentPage={5} total={50} pageSize={10} />);

    const nextBtns = screen.getAllByRole('button', { name: 'Next' }); // one for desktop and the other for mobile

    // Check that next button is disabled
    expect(nextBtns[0]).toBeDisabled();
    expect(nextBtns[1]).toBeDisabled();
  });

  it('changes page when a page number is clicked', () => {
    render(<Pagination {...defaultProps} />);

    // Simulate clicking on page 3
    fireEvent.click(screen.getByText('3'));
    expect(defaultProps.onPageChange).toHaveBeenCalledWith(3);
  });
});