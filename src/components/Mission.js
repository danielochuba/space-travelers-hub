import React from 'react';
import '../styles/missions.css';
import { useDispatch } from 'react-redux';
import PropTypes from 'prop-types';
import { joinMission, leaveMission, filterMissions } from '../redux/missions/missionsSlice';

function Mission({
  id, name, description, reserved,
}) {
  const dispatch = useDispatch();
  const joinBtn = reserved ? <button type="button" onClick={() => { dispatch(leaveMission(id)); dispatch(filterMissions()); }} className="leaveMission" id={id}>Leave Mission</button> : <button className="joinMission" onClick={() => { dispatch(joinMission(id)); dispatch(filterMissions()); }} type="button" id={id}>Join Mission</button>;
  const statusClass = reserved ? 'activeMember' : 'notActive';

  return (
    <div className="missionDiv" id={id}>
      <h2 className="titleM">{name}</h2>
      <p className="descriptionM">{description}</p>
      <div className="statusM">
        <p className={statusClass}>
          {reserved ? 'Active Member' : 'NOT A MEMBER'}
        </p>
      </div>
      <div className="joinBtn">
        {joinBtn}
      </div>
    </div>
  );
}

Mission.propTypes = {
  id: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  reserved: PropTypes.bool.isRequired,
};

export default Mission;
