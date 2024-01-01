/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import { useDispatch } from 'react-redux';
import Rocket from '../components/Rocket';
import { cancelReservation, filterRockets, reserveRocket } from '../redux/rockets/rocketSlices';
import '@testing-library/jest-dom';

jest.mock('react-redux', () => ({
  useDispatch: jest.fn(),
}));

describe('Rocket component', () => {
  let dispatchMock;

  beforeEach(() => {
    dispatchMock = jest.fn();
    useDispatch.mockReturnValue(dispatchMock);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  const rocketProps = {
    id: 'rocket1',
    name: 'Rocket 1',
    description: 'Rocket description',
    images: ['image1.jpg', 'image2.jpg'],
    reserved: false,
  };

  it('should render rocket details', () => {
    const { getByText, getByAltText } = render(<Rocket {...rocketProps} />);

    expect(getByText(rocketProps.name)).toBeInTheDocument();
    expect(getByText(rocketProps.description)).toBeInTheDocument();
    expect(getByAltText('rocket')).toHaveAttribute('src', rocketProps.images[0]);
  });

  it('should render reserve button when not reserved', () => {
    const { getByText } = render(<Rocket {...rocketProps} />);

    const reserveButton = getByText('Reserve Rocket');
    expect(reserveButton).toBeInTheDocument();
  });

  it('should dispatch reserveRocket and filterRockets actions when reserve button is clicked', () => {
    const { getByText } = render(<Rocket {...rocketProps} />);
    const reserveButton = getByText('Reserve Rocket');

    fireEvent.click(reserveButton);

    expect(dispatchMock).toHaveBeenCalledTimes(2);
    expect(dispatchMock).toHaveBeenCalledWith(reserveRocket(rocketProps.id));
    expect(dispatchMock).toHaveBeenCalledWith(filterRockets());
  });

  it('should dispatch cancelReservation and filterRockets actions when cancel button is clicked', () => {
    const reservedProps = {
      ...rocketProps,
      reserved: true,
    };
    const { getByText } = render(<Rocket {...reservedProps} />);
    const cancelButton = getByText('Cancel Reservation');

    fireEvent.click(cancelButton);

    expect(dispatchMock).toHaveBeenCalledTimes(2);
    expect(dispatchMock).toHaveBeenCalledWith(cancelReservation(reservedProps.id));
    expect(dispatchMock).toHaveBeenCalledWith(filterRockets());
  });
});
