import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getMissions } from '../redux/missions/missionsSlice';
import Mission from './Mission';
import '../styles/missions.css';

function Missions() {
  const missions = useSelector((state) => state.mission.missions);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getMissions());
  }, [dispatch]);

  const mappedMissions = missions.slice(0, 9).map((mission) => (
    <Mission
      key={mission.id}
      id={mission.id}
      name={mission.name}
      description={mission.description}
      reserved={mission.reserved}
    />
  ));

  return (
    <section>
      <div className="headerM">
        <h2 className="titleM">Mission</h2>
        <h2 className="descriptionM">Description</h2>
        <h2 id="statusHeader" className="statusM">Status</h2>
        <span className="joinBtn" />
      </div>
      {mappedMissions}
    </section>
  );
}

export default Missions;
