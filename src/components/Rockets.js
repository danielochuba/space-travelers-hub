import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getRockets } from '../redux/rockets/rocketSlices';
import Rocket from './Rocket';

function Rockets() {
  const rockets = useSelector((state) => state.rocket.rockets);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getRockets());
  }, [dispatch]);

  const mappedRockets = rockets.slice(0, 4).map((rocket) => (
    <Rocket
      key={rocket.id}
      id={rocket.id}
      name={rocket.name}
      description={rocket.description}
      images={rocket.flickr_images}
      reserved={rocket.reserved}
    />
  ));

  return (
    <section>
      {mappedRockets}
    </section>
  );
}

export default Rockets;
