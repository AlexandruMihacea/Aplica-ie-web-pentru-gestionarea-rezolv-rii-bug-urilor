import './App.css';
import { BrowserRouter as Router, Route, Switch} from 'react-router-dom';
import Home from './Pages/Home';
import LogIn  from './Pages/LogIn';
import Register from './Pages/Register';
import ReportBug from './Pages/TesterMainPg'
import UserPage from './Pages/UserPage';
import AddProject from './Pages/AddProject';
import MyBugs from './Pages/MyBugs';
import DenseAppBar from './Components/NavBar'

// Paleta culori: #171820, #fdc029, #df861d, #aa3d01, #bcb6ae

function App() {
  return (
    
    
    <Router>
      <DenseAppBar/>
      <div className="App">
        <div className='second-container'>
            <Switch>
              <Router exact path='/'>
                <Home />
              </Router>
              <Router path='/login'>
                <LogIn />
              </Router>
              <Router path='/register'>
                <Register />
              </Router>
              <Router path='/reportBug'>
                <ReportBug />
              </Router>
              <Router path='/userPage'>
                <UserPage />
              </Router>
              <Router path='/addProject'>
                <AddProject />
              </Router>
              <Router path='/myBugs'>
                <MyBugs />
              </Router>
            </Switch>
      </div>
     </div>
    </Router>

  
  );
}

export default App;
