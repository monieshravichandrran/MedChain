import './App.css';
import { history } from "./history";
import { Route, Router } from "react-router-dom";
import Login from './pages/Login';
import Hospital from './pages/hospital/Hospital';
import Patient from './pages/patient/Patient';

function App() {
  return (
      <Router history={history}>
        <Route path="/" exact component={Login} />
        <Route path="/hospital" exact component={Hospital} />
        <Route path="/patient" exact component={Patient} />
      </Router>
  );
}

export default App;
