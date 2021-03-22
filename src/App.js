import './App.css';
import { BrowserRouter as Router, Route} from "react-router-dom";
import Register from './components/register.component';
import Login from './components/login.component';
import HomeScreen from './components/homeScreen.component';

function App() {
  return (
    <div className="App">
      <div className="Header">
        <img id="logo" src="/timey.png" alt="timey-logo" />
      </div>
      <div className='Router'>
        <Router>
          <Route exact path="/register" component={Register} />
          <Route exact path="/login" component={Login} />
          <Route exact path="/times" component={HomeScreen} />
        </Router>
      </div>
    </div>
  );
}

export default App;
