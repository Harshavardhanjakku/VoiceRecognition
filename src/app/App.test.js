import { render, screen } from '@testing-library/react';
import GamePage from './GamePage';

test('renders learn react link', () => {
  render(<GamePage />);
  const linkElement = screen.getByText(/learn react/i);
  expect(linkElement).toBeInTheDocument();
});
