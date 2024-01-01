/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import { useDispatch } from 'react-redux';
import Mission from '../components/Mission';
import {
  joinMission,
  leaveMission,
  filterMissions,
} from '../redux/missions/missionsSlice';
import '@testing-library/jest-dom';

jest.mock('react-redux', () => ({
  useDispatch: jest.fn(),
}));

describe('Mission component', () => {
  let dispatchMock;

  beforeEach(() => {
    dispatchMock = jest.fn();
    useDispatch.mockReturnValue(dispatchMock);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  const missionProps = {
    id: 'misison1',
    name: 'Mission 1',
    description: 'Mission description',
    reserved: false,
  };

  it('should render rocket details', () => {
    const { getByText } = render(<Mission {...missionProps} />);

    expect(getByText(missionProps.name)).toBeInTheDocument();
    expect(getByText(missionProps.description)).toBeInTheDocument();
  });

  it('should render reserve button when not reserved', () => {
    const { getByText } = render(<Mission {...missionProps} />);

    const joinButton = getByText('Join Mission');
    expect(joinButton).toBeInTheDocument();
  });

  it('should dispatch reserveRocket and filterRockets actions when reserve button is clicked', () => {
    const { getByText } = render(<Mission {...missionProps} />);
    const joinButton = getByText('Join Mission');

    fireEvent.click(joinButton);

    expect(dispatchMock).toHaveBeenCalledTimes(2);
    expect(dispatchMock).toHaveBeenCalledWith(joinMission(missionProps.id));
    expect(dispatchMock).toHaveBeenCalledWith(filterMissions());
  });

  const containsLeaveMissionText = (element) => element.textContent.includes('Leave Mission');

  it('should dispatch cancelReservation and filterRockets actions when cancel button is clicked', () => {
    const reservedProps = {
      ...missionProps,
      reserved: true,
    };
    const { getByText } = render(<Mission {...reservedProps} />);
    const leaveButton = getByText('Leave Mission');

    const isLeaveMissionButtonPresent = containsLeaveMissionText(leaveButton);
    expect(isLeaveMissionButtonPresent).toBeTruthy();

    fireEvent.click(leaveButton);

    expect(dispatchMock).toHaveBeenCalledTimes(2);
    expect(dispatchMock).toHaveBeenCalledWith(
      leaveMission(reservedProps.id),
    );
    expect(dispatchMock).toHaveBeenCalledWith(filterMissions());
  });
});
