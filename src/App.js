import './App.css';
import { history } from "./history";
import { Route, Router } from "react-router-dom";
import Login from './pages/Login';
import Hospital from './pages/hospital/Hospital';
import Patient from './pages/patient/Patient';
import AddMedicalRecord from './pages/hospital/AddMedicalRecord';
import ViewMedicalRecord from './pages/hospital/ViewMedicalRecord';
import PatientView from './pages/patient/PatientView';
import RemoveAccess from './pages/patient/RemoveAccess';

function App() {
  return (
    <Router history={history}>
      <Route path="/" exact component={Login} />
      <Route path="/hospital" exact component={Hospital} />
      <Route path="/patient" exact component={Patient} />
      <Route path="/hospital/add" exact component={AddMedicalRecord} />
      <Route path="/hospital/view" exact component={ViewMedicalRecord} />
      <Route path="/patient/view" exact component={PatientView} />
      <Route path="/patient/manage" exact component={RemoveAccess} />
    </Router>
  );
}

export default App;
