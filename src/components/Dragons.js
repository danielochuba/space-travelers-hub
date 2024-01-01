import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getDragons } from '../redux/dragons/dragonsSlice';
import Dragon from './Dragon';

function Dragons() {
  const dragons = useSelector((state) => state.dragon.dragons);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getDragons());
  }, [dispatch]);

  const mappedDragons = dragons.slice(0, 2).map((dragon) => (
    <Dragon
      key={dragon.id}
      id={dragon.id}
      name={dragon.name}
      description={dragon.description}
      images={dragon.flickr_images}
      reserved={dragon.reserved}
    />
  ));

  return (
    <section>
      {mappedDragons}
    </section>
  );
}

export default Dragons;
