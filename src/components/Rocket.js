import React from 'react';
import '../styles/rocket.css';
import { useDispatch } from 'react-redux';
import PropTypes from 'prop-types';
import { Button, Badge } from 'react-bootstrap';
import { reserveRocket, cancelReservation, filterRockets } from '../redux/rockets/rocketSlices';

function Rocket({
  id, name, description, images, reserved,
}) {
  const dispatch = useDispatch();
  const CTAButton = reserved ? <Button variant="outline-secondary" onClick={() => { dispatch(cancelReservation(id)); dispatch(filterRockets()); }} className="CTABtn" id={id}>Cancel Reservation</Button> : <Button className="CTABtn" onClick={() => { dispatch(reserveRocket(id)); dispatch(filterRockets()); }} type="button" variant="primary" id={id}>Reserve Rocket</Button>;
  return (
    <div className="rocketCard" id={id}>
      <img src={images[0]} className="cardImage" alt="rocket" />
      <div className="details">
        <h2 className="title">{name}</h2>
        <p className="description">
          {reserved && <Badge bg="success">reserved</Badge>}
          {' '}
          {description}
        </p>
        {CTAButton}
      </div>
    </div>
  );
}

Rocket.propTypes = {
  id: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  images: PropTypes.string.isRequired,
  reserved: PropTypes.bool.isRequired,
};

export default Rocket;
