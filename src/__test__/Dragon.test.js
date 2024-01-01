import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import { useDispatch } from 'react-redux';
import Dragon from '../components/Dragon';

jest.mock('react-redux', () => ({
  useDispatch: jest.fn(),
}));

describe('Dragon component', () => {
  const mockDispatch = jest.fn();
  useDispatch.mockReturnValue(mockDispatch);

  const mockDragon = {
    id: 'dragon1',
    name: 'Dragon 1',
    description: 'This is a dragon.',
    images: ['dragon1.jpg'],
    reserved: false,
  };

  beforeEach(() => {
    render(
      <Dragon
        id={mockDragon.id}
        name={mockDragon.name}
        description={mockDragon.description}
        images={mockDragon.images}
        reserved={mockDragon.reserved}
      />,
    );
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  test('renders dragon component correctly', () => {
    const dragonElement = screen.getByTestId('dragon-component');
    expect(dragonElement).toBeInTheDocument();
    expect(dragonElement).toHaveAttribute('id', 'dragon1');
  });
});
