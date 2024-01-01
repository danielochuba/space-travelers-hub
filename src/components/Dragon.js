import React from 'react';
import { useDispatch } from 'react-redux';
import PropTypes from 'prop-types';
import { Button, Badge } from 'react-bootstrap';
import { reserveDragon, cancelReservation, filterDragons } from '../redux/dragons/dragonsSlice';
import '../styles/dragon.css';

function Dragon({
  id, name, description, images, reserved,
}) {
  const dispatch = useDispatch();

  const CTAButton = reserved ? (
    <Button variant="outline-secondary" onClick={() => { dispatch(cancelReservation(id)); dispatch(filterDragons()); }} className="CTABtn" id={id}>
      Cancel Reservation
    </Button>
  ) : (
    <Button className="CTABtn" onClick={() => { dispatch(reserveDragon(id)); dispatch(filterDragons()); }} type="button" variant="primary" id={id}>
      Reserve Dragon
    </Button>
  );

  return (
    <div className="dragon-section" id={id} data-testid="dragon-component">
      <img src={images[0]} className="dragon-picture" alt="dragon" />
      <div className="details">
        <h2 className="title">{name}</h2>
        <p className="dragon-writeup">
          {reserved && <Badge bg="success">reserved</Badge>}
          {' '}
          {description}
        </p>
        {CTAButton}
      </div>
    </div>
  );
}

Dragon.propTypes = {
  id: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  images: PropTypes.arrayOf.isRequired,
  reserved: PropTypes.bool.isRequired,
};

export default Dragon;
