import React, { useState } from "react";
import SignOut from "../../components/FullPageLoader";
import GoBack from "../../components/GoBack";
import FullPageLoader from "../../components/FullPageLoader";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { collection, query, where, getDocs, getFirestore } from "@firebase/firestore";
import firebase from "../../firebaseConfig";
import "firebase/firestore";
import { GiTakeMyMoney } from "react-icons/gi";
import { BsChatFill } from "react-icons/bs";
import Records from "../../components/Records";

const ViewMedicalRecord = () => {
  const [patientmail, setPatientMail] = useState("");
  const [Request, setRequ] = useState();
  const [error, setError] = useState("");
  const [loader, setLoader] = useState(false);
  const [showRecords, setShowRecords] = useState(false);
  const { auth, accounts, contract } = useSelector((state) => state);

  const formHandler = async (event) => {
    setError("");
    setLoader(true);
    event.preventDefault();
    if (patientmail.length == 0) {
      setError("Enter Patient Mail");
    } else {
      let reqs = [];
      let reqs1 = [];
      const setRequests1 = async () => {
        const db = getFirestore();
        const usersRef = collection(db, "permissions");
        const q = query(
          usersRef,
          where("email", "==", patientmail),
          where("grant", "==", auth.user.email)
        );
        console.log(q);
        const querySnapshot = await getDocs(q);
        querySnapshot.forEach((doc) => {
          reqs1.push({
            id: doc.id,
            data: doc.data(),
          });
        });
      };
      const setRequests = async () => {
        const db = getFirestore();
        const usersRef = collection(db, "Records");
        const q = query(usersRef, where("patient", "==", patientmail));
        const querySnapshot = await getDocs(q);
        querySnapshot.forEach((doc) => {
          reqs.push({
            id: doc.id,
            data: doc.data(),
          });
        });
        setRequ(reqs);
      };
      await setRequests();
      await setRequests1();
      console.log(reqs.length, reqs);
      if (patientmail.length <= 0) {
        setError("Enter Valid Email");
        setLoader(false);
        return;
      } else if (reqs1.length <= 0) {
        setError("You don't have access to this Patient");
        setLoader(false);
        return;
      }
      console.log(reqs1);
      setShowRecords(true);
      setPatientMail("");
      const res = await contract.methods.getPatientRecords(accounts[2]).call({
        from: accounts[1],
        gas: "6100000",
      });
      console.log(res);
    }
    setLoader(false);
  };

  return (
    <>
      <SignOut />
      <GoBack />
      {showRecords ? (
        <div
          className="h-screen w-screen text-white"
          style={{
            background: "linear-gradient(rgba(0,0,0,0.7),rgba(0,0,0,0.7))",
          }}
        >
          <div className="flex justify-center content-center w-full">
            <h1 className="text-5xl font-montserrat mt-10">Welcome to Middlemen</h1>
          </div>
          <ul className="mt-10">
            {Request.length > 0 ? (
              <li>
                <div className="ml-10 grid grid-cols-3 mb-10">
                  <h1 className="text-white text-2xl text-center">Hospital</h1>
                  <h1 className="text-white text-2xl text-center">Description</h1>
                  <h1 className="text-white text-2xl text-center">Medical Record</h1>
                </div>
              </li>
            ) : null}
            {Request.map((grant, index) => {
              return <Records key={index + 1} grant={grant} />;
            })}
          </ul>
        </div>
      ) : (
        <div className="relative">
          <FullPageLoader show={loader} />
          <div className="h-screen w-screen text-white font-montserrat">
            <div className="flex justify-center content-center w-full">
              <h1 className="text-5xl font-montserrat mt-10">Welcome to MedChain</h1>
            </div>
            <div className="flex justify-center content-center w-full">
              <p className="text-3xl font-montserrat">Secure Solutions</p>
            </div>
            <div className="mx-auto">
              <div className="flex justify-center px-6 my-12">
                <div
                  className="flex"
                  style={{
                    background: "linear-gradient(rgba(0,0,0,0.7),rgba(0,0,0,0.7))",
                  }}
                >
                  <div className="p-10 rounded-lg lg:rounded-l-none">
                    <div className="px-8 mb-4 text-center">
                      <h3 className="pt-4 mb-5 text-4xl text-white">Search Patient</h3>
                      <p className="mb-4 text-sm text-white">
                        Connect with patients with their Email. Enter Patient Email to view the
                        patient past details
                      </p>
                    </div>
                    <form className="px-8 pt-6 pb-8 mb-4 rounded">
                      <div className="mb-4">
                        <label className="block mb-2 text-sm font-bold text-white" for="AADHAR">
                          Email
                        </label>
                        <input
                          className="w-3/4 px-3 py-2 text-sm leading-tight text-gray-700 border rounded shadow appearance-none focus:outline-none focus:shadow-outline"
                          id="email"
                          type="email"
                          value={patientmail}
                          onChange={(event) => {
                            setPatientMail(event.target.value);
                          }}
                          placeholder="Enter Patient Email..."
                        />
                      </div>
                      <div className="mb-6 text-center">
                        <button
                          className="px-4 py-2 font-bold text-white bg-red-500 rounded-full hover:bg-red-700 focus:outline-none focus:shadow-outline"
                          type="button"
                          onClick={formHandler}
                        >
                          Request
                        </button>
                      </div>
                      <div className="flex justify-center">
                        <p className="text-red-500 text-lg">{error}</p>
                      </div>
                      <hr className="mb-6 border-t" />
                    </form>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default ViewMedicalRecord;
