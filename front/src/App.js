import './App.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Home from './Pages/Home';
import LogIn from './Pages/LogIn';
import Register from './Pages/Register';
import ReportBug from './Pages/TesterMainPg'
import UserPage from './Pages/UserPage';
import AddProject from './Pages/AddProject';
import MyBugs from './Pages/MyBugs';
import DenseAppBar from './Components/NavBar'
import FormBug from './Pages/FormBug'
import StateTextFields from './Pages/AddProject';

// Paleta culori: #171820, #fdc029, #df861d, #aa3d01, #bcb6ae
// updated react router dom from "^5.3.0" to ^6.2.1 because i needed navigate and routes 
function App() {
  return (
    <BrowserRouter>
      <DenseAppBar />
      <div className="App">
        <div className='second-container'>
          <Routes>
            <Route exact path="/" element={<Home />} />
            <Route path="/register" element={<Register />} />
            <Route path="/login" element={<LogIn />} />
            <Route path="/reportBug" element={<ReportBug />} />
            <Route path="/userPage/:id" element={<UserPage />} />
            <Route path="/addProject/:id" element={<AddProject />} />
            <Route path="/myBugs/:id" element={<MyBugs />} />
          </Routes>
        </div>
      </div>
    </BrowserRouter>




  );
}

export default App;
