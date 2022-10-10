import React, { useState } from 'react';
import SignOut from '../../components/FullPageLoader';
import GoBack from '../../components/GoBack';
import FullPageLoader from '../../components/FullPageLoader';
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import {
  collection,
  query,
  where,
  getDocs,
  getFirestore,
} from "@firebase/firestore";
import firebase from "../../firebaseConfig";
import "firebase/firestore";
import { CgProfile } from "react-icons/cg";
import NotFound from '../NotFound';

const Hospital = () => {
  const auth = useSelector((state) => state.auth);
  const [patientmail, setPatientMail] = useState("");
  const [Request, setRequ] = useState();
  const [error, setError] = useState("");
  const [loader, setLoader] = useState(false);
  console.log("auth", auth);
  const formHandler = async (event) => {
    setError("");
    setLoader(true);
    event.preventDefault();
    if (patientmail.length == 0) {
      setError("Enter Patient Mail");
    } else {
      let reqs = [];
      const setRequests = async () => {
        const db = getFirestore();
        const usersRef = collection(db, "users");
        const q = query(
          usersRef,
          where("email", "==", patientmail),
          where("from", "==", auth.user.email)
        );
        const querySnapshot = await getDocs(q);
        querySnapshot.forEach((doc) => {
          reqs.push({
            id: doc.id,
            data: doc.data(),
          });
        });
        setRequ(reqs);
      };
      let reqs1 = [];
      const setRequests1 = async () => {
        const db = getFirestore();
        const usersRef = collection(db, "Requests");
        const q = query(
          usersRef,
          where("email", "==", patientmail),
          where("from", "==", auth.user.email)
        );
        const querySnapshot = await getDocs(q);
        querySnapshot.forEach((doc) => {
          reqs1.push({
            id: doc.id,
            data: doc.data(),
          });
        });
        setRequ(reqs1);
      };
      await setRequests();
      await setRequests1();
      console.log(reqs.length, reqs);
      console.log(reqs1.length, reqs1);
      if (patientmail.length <= 0) {
        setError("Enter Valid Email");
      } else if (
        reqs.length == 0 &&
        reqs1.length == 0) {
        await firebase
          .firestore()
          .collection("permissions")
          .doc()
          .set({
            email: patientmail,
            from: auth.user.email,
          })
          .then(() => { });
      } else if (reqs.length > 0) {
        setError("Request Already Sent !!!");
      } else if (reqs1.length > 0) {
        setError("You already have Read Access of this Patient");
      }
      setPatientMail("");
    }
    // window.onscroll = null;
    setLoader(false);
  };

  return (
    <>
      {auth.type != -1 ?
        <div className="relative">
          <SignOut />
          <FullPageLoader show={loader} />
          <GoBack />
          <div className="h-screen w-screen text-white font-montserrat">
            <div className="inline float-right">
              <Link to="/hospital/profile">
                <CgProfile className="inline text-3xl mt-2 mr-5" />
              </Link>
            </div>
            <div className="flex justify-center content-center w-full">
              <h1 className="text-5xl font-montserrat mt-10">
                Welcome to MedChain
              </h1>
            </div>
            <div className="flex justify-center content-center w-full">
              <p className="text-3xl font-montserrat">Secure Solutions</p>
            </div>
            <div className="mx-auto">
              <div className="flex justify-center px-6 my-12">
                <div
                  className="flex"
                  style={{
                    background:
                      "linear-gradient(rgba(0,0,0,0.7),rgba(0,0,0,0.7))",
                  }}
                >
                  <div className="p-10 rounded-lg lg:rounded-l-none">
                    <div className="px-8 mb-4 text-center">
                      <h3 className="pt-4 mb-5 text-4xl text-white">
                        Connect with a new Patient
                      </h3>
                      <p className="mb-4 text-sm text-white">
                        Connect with patients with their Email.
                        Enter Patient Email to view the patient past details
                      </p>
                    </div>
                    <form className="px-8 pt-6 pb-8 mb-4 rounded">
                      <div className="mb-4">
                        <label
                          className="block mb-2 text-sm font-bold text-white"
                          for="AADHAR"
                        >
                          Email
                        </label>
                        <input
                          className="w-3/4 px-3 py-2 text-sm leading-tight text-gray-700 border rounded shadow appearance-none focus:outline-none focus:shadow-outline"
                          id="email"
                          type="email"
                          value={patientmail}
                          onChange={(event) => {
                            setPatientMail(
                              event.target.value
                            );
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
                        <p className="text-white text-lg">
                          {error}
                        </p>
                      </div>
                      <hr className="mb-6 border-t" />
                    </form>
                    <div className="flex justify-center">
                      <Link
                        to="/hospital/add"
                        className="text-xl hover:text-blue-500"
                      >
                        Add a new patient record
                      </Link>
                    </div>
                    <div className="flex justify-center">
                      <Link
                        to="/hospital/view"
                        className="mt-4 text-xl hover:text-red-500"
                      >
                        View Existing Patient Record
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        : <NotFound />}
    </>
  )
}

export default Hospital;