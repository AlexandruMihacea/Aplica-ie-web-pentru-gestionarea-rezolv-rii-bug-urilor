import './App.css';
import { BrowserRouter as Router, Route, Switch} from 'react-router-dom';
import Home from './Pages/Home';
import LogIn  from './Pages/LogIn';
import Register from './Pages/Register';
import ReportBug from './Pages/TesterMainPg'
import UserPage from './Pages/UserPage';
import AddProject from './Pages/AddProject';
import MyBugs from './Pages/MyBugs';

function App() {
  return (
    
    <Router>
      <div className="App">
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
    </Router>

  
  );
}

export default App;
