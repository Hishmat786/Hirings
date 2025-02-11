import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';
import LandingPage from './Components/LandingPage';
import Register from './Components/Register';
import LogIn from './Components/LogIn';
import EmployeeDashboard from './Components/Employeer/EmployeeDashboard'
import JobSeekerDashboard from './Components/JobSeeker/JobSeekerDashboard';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LandingPage/>} />
        <Route path="/register" element={<Register/>} />
        <Route path="/login" element={<LogIn/>} />
        <Route path="/employee-dashboard" element={<EmployeeDashboard/>} />
        <Route path="/jobseeker-dashboard" element={<JobSeekerDashboard/>} />
      </Routes>
    </Router>
  );
}

export default App;
