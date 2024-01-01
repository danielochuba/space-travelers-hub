import './App.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Navbar from './components/Navbar';
import Profile from './components/Profile';
import Rockets from './components/Rockets';
import Dragons from './components/Dragons';
import Missions from './components/Missions';

const App = () => (
  <Router>
    <Navbar />
    <Routes>
      <Route exact path="/" element={<Profile />} />
      <Route path="/rockets" element={<Rockets />} />
      <Route path="/missions" element={<Missions />} />
      <Route path="/dragons" element={<Dragons />} />
    </Routes>
  </Router>
);

export default App;
