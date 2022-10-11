import "./App.css";
import { history } from "./history";
import { Route, Router } from "react-router-dom";
import Login from "./pages/Login";
import Hospital from "./pages/hospital/Hospital";
import Patient from "./pages/patient/Patient";
import AddMedicalRecord from "./pages/hospital/AddMedicalRecord";
import ViewMedicalRecord from "./pages/hospital/ViewMedicalRecord";
import PatientView from "./pages/patient/PatientView";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import Record from "./ethereum/build/Record.json";
import { contractAddress } from "./ethereum/contractAddress";
import Web3 from "web3";
import RemoveAccess from "./pages/patient/RemoveAccess";

function App() {
  const dispatch = useDispatch();
  useEffect(() => {
    const getContract = async () => {
      const provider = new Web3.providers.HttpProvider("http://127.0.0.1:7545");
      const web3 = new Web3(provider);
      const instance = new web3.eth.Contract(JSON.parse(Record.interface), contractAddress);
      let accounts = await web3.eth.getAccounts();
      console.log(accounts, instance);
      console.log("hello world");
      dispatch({ type: "WEB3", payload: web3 });
      dispatch({ type: "ALL_ACCOUNTS", payload: accounts });
      dispatch({ type: "CONTRACT", payload: instance });

      if (window != null && window.ethereum != null) {
        window.ethereum.on("accountsChanged", (accounts) => {
          console.log("Changed Account:", accounts);
          dispatch({ type: "ALL_ACCOUNTS", payload: accounts });
        });
      }
    };
    getContract();
  }, []);

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
