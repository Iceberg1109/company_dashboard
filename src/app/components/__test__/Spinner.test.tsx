import React from 'react';
import { render, screen } from '@testing-library/react';
import Spinner from '../Spinner';

describe('Spinner Component', () => {
  it('renders correctly', () => {
    render(<Spinner />);

    // Check if the spinner SVG is in the document
    const spinner = screen.getByRole('status');
    expect(spinner).toBeInTheDocument();

    // Check if the loading text is accessible
    const loadingText = screen.getByText(/loading/i);
    expect(loadingText).toBeInTheDocument();
    
    // Check if the SVG has the correct classes
    const svgElement = spinner.querySelector('svg');
    expect(svgElement).toHaveClass('animate-spin');
    expect(svgElement).toHaveClass('fill-blue-600');
  });
});