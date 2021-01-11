import './App.css';
import { BrowserRouter as Router, Route} from "react-router-dom";

import TimeList from './components/timeList.component'
import Register from "./components/register.component"
import Login from "./components/login.component";

function App() {
  return (
    <div className="App">
    <Router>
      <div className="container">
      <Route path="/register" component={Register} />
      <Route path="/login" component={Login} />
      <Route path="/times" component={TimeList} />
      </div>
    </Router>
    </div>
  );
}

export default App;
