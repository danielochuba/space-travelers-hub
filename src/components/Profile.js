import React from 'react';
import {
  ListGroup, Container, Row, Col,
} from 'react-bootstrap';
import { useSelector } from 'react-redux';

function Profile() {
  const reservedRockets = useSelector((state) => state.rocket.reservedRockets);
  let rocketRender;
  if (reservedRockets.length === 0) {
    rocketRender = <div>You have not reserved any Rocket</div>;
  } else {
    rocketRender = (
      <ListGroup>
        {reservedRockets.map((rocket) => (
          <ListGroup.Item key={rocket.id}>{rocket.name}</ListGroup.Item>
        ))}
      </ListGroup>
    );
  }

  const reservedMissions = useSelector((state) => state.mission.reservedMissions);
  let missionRender;
  if (reservedMissions.length === 0) {
    missionRender = <div>You have not reserved any Mission</div>;
  } else {
    missionRender = (
      <ListGroup>
        {reservedMissions.map((mission) => (
          <ListGroup.Item key={mission.id}>{mission.name}</ListGroup.Item>
        ))}
      </ListGroup>
    );
  }

  const reservedDragons = useSelector((state) => state.dragon.reservedDragons);
  let dragonRender;
  if (reservedDragons.length === 0) {
    dragonRender = <div>You have not reserved any Rocket</div>;
  } else {
    dragonRender = (
      <ListGroup>
        {reservedDragons.map((dragon) => (
          <ListGroup.Item key={dragon.id}>{dragon.name}</ListGroup.Item>
        ))}
      </ListGroup>
    );
  }

  return (
    <Container style={{ marginTop: '2rem' }}>
      <Row sm={1} md={2} lg={3}>
        <Col className="missionsSection">
          <h1 className="missionTitle">My Missions</h1>
          {missionRender}
        </Col>
        <Col className="rocketsSection">
          <h1 className="rocketTitle">My Rockets</h1>
          {rocketRender}
        </Col>
        <Col className="dragonsSection">
          <h1 className="dragonTitle">My Dragons</h1>
          {dragonRender}
        </Col>
      </Row>
    </Container>
  );
}

export default Profile;
