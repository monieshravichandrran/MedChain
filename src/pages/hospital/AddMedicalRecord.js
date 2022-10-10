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
import IPFS from "../../IPFS";

const AddMedicalRecord = () => {
  const [Requ, setRequ] = useState();
  const [insMail, setInsMail] = useState("");
  const [aadhar, setAadhar] = useState("");
  const [money, setMoney] = useState("");
  const [dsFile, setDsFile] = useState("");
  const [patientMail, setPatientMail] = useState("");
  const [error, setError] = useState("");
  const [loaderShow, setLoaderShow] = useState(false);
  const { auth, accounts, contract } = useSelector((state) => state);

  const formHandler = async (event) => {
    setLoaderShow(true);
    setError("");
    console.log("Clicked");
    event.preventDefault();
    if (insMail.length == 0) {
      setError("Enter Insurance Mail");
    } else if (patientMail.length == 0) {
      setError("Enter Patient Mail");
    } else if (aadhar.length == 0) {
      setError("Enter Patient Aadhar Number");
    } else if (aadhar.length != 12) {
      setError("Enter Valid Patient Aadhar Number");
    } else if (money.length == 0) {
      setError("Enter Money");
    } else if (money <= 0) {
      setError("Enter valid money");
    } else if (dsFile.length == 0) {
      setError("Attach discharge summary");
    } else {
      console.log("else ");
      let reqs = [];
      const setRequests = async () => {
        const db = getFirestore();
        const usersRef = collection(db, "HospitalRead");
        const q = query(
          usersRef,
          where("email", "==", patientMail),
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
        const usersRef = collection(db, "InsuranceWrite");
        const q = query(
          usersRef,
          where("email", "==", patientMail),
          where("from", "==", insMail)
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
      let reqs2 = [];
      const setRequests2 = async () => {
        const db2 = getFirestore();
        const usersRef2 = collection(db2, "insurance");
        const q2 = query(
          usersRef2,
          where("from", "==", auth.user.email),
          where("patient", "==", patientMail)
        );
        const querySnapshot2 = await getDocs(q2);
        querySnapshot2.forEach((doc) => {
          reqs2.push({
            id: doc.id,
            data: doc.data(),
          });
        });
        setRequ(reqs2);
      };
      await setRequests();
      await setRequests1();
      await setRequests2();
      console.log(reqs, reqs1, reqs2);
      const task = async () => {
        if (reqs.length > 0 && reqs1.length > 0 && reqs2.length == 0) {
          const response = await IPFS.add(dsFile);
          let asciiArray = [];
          for (let i = 0; i < response.path.length; ++i)
            asciiArray.push(response.path.charCodeAt(i));
          await firebase
            .firestore()
            .collection("insurance")
            .doc()
            .set({
              email: insMail,
              from: auth.user.email,
              aadhar: aadhar,
              patient: patientMail,
              money: parseFloat(money),
            })
            .then(() => { });
          const db = getFirestore();
          const usersRef = collection(db, "users");
          const q = query(
            usersRef,
            where("email", "==", patientMail)
          );
          let acc = [];
          const querySnapshot = await getDocs(q);
          querySnapshot.forEach((doc) => {
            acc.push({
              id: doc.id,
              data: doc.data(),
            });
          });
          console.log(acc[0].data.address, accounts[0]);
          await contract.methods
            .addDS(acc[0].data.address, asciiArray)
            .send({ from: accounts[0], gas: "6000000" });
        } else if (reqs.length == 0) {
          setError("You dont have the Read Access of the Patient");
        } else if (reqs1.length == 0) {
          setError(
            "The Patient donot have an insurance in this company"
          );
        } else if (reqs2.length != 0) {
          setError("You have already sent request for same patient");
        }
      };
      await task();
    }
    setLoaderShow(false);
  };
  return (
    <>
      <SignOut />
      <FullPageLoader show={loaderShow} />
      <GoBack />
      <div
        className="h-screen w-screen text-white"
      >
        <div className="inline float-right">
          <Link to="/hospital/profile">
            <CgProfile className="inline text-3xl mt-2 mr-5" />
          </Link>
        </div>
        <div className="flex justify-center content-center w-full">
          <h1 className="text-5xl font-montserrat mt-10">
            Welcome to Middlemen
          </h1>
        </div>
        <div className="flex justify-center content-center w-full">
          <p className="text-3xl font-montserrat">Secure Solutions</p>
        </div>
        <div className="mx-auto">
          <div className="flex justify-center px-6" >
            <div className="flex">
              <div className="p-10 rounded-lg lg:rounded-l-none mt-4 mb-10" style={{
                background:
                  "linear-gradient(rgba(0,0,0,0.7),rgba(0,0,0,0.7))",
              }}>
                <div className="px-8 mb-4 text-center">
                  <h3 className="pt-4 mb-5 text-4xl text-white">
                    Add Medical Record to Patient Chain
                  </h3>
                  <p className="mb-4 text-sm text-white">
                    Enter the Patient email id and then give a Description of the
                    health problem and upload the <br />Prescription along with other required files
                  </p>
                </div>
                <form className="px-8 pt-6 pb-8 mb-4 rounded">
                  <div className="mb-4">
                    <label
                      className="block mb-2 text-sm font-bold text-white"
                      for="email"
                    >
                      Patient Email
                    </label>
                    <input
                      className="w-3/4 px-3 py-2 text-sm leading-tight text-gray-700 border rounded shadow appearance-none focus:outline-none focus:shadow-outline"
                      id="email"
                      type="email"
                      value={patientMail}
                      onChange={(event) => {
                        setPatientMail(
                          event.target.value
                        );
                      }}
                      placeholder="Enter Patient Email..."
                    />
                    <label
                      className="block mb-2 text-sm font-bold text-white mt-4"
                      for="money"
                    >
                      Description
                    </label>
                    <input type="text" className='w-80 h-28' />
                    <label
                      className="block mb-2 text-sm font-bold text-white mt-4"
                      for="money"
                    >
                      File Prescription
                    </label>
                    <input
                      className="w-3/4 px-3 py-2 text-sm leading-tight text-gray-700 border rounded shadow appearance-none focus:outline-none focus:shadow-outline"
                      id="discharge"
                      type="file"
                      placeholder="Upload Discharge Summary..."
                      onChange={(e) =>
                        setDsFile(e.target.files[0])
                      }
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
                    {error ? (
                      <h1 className="text-lg bg-red-600 p-1 px-3 rounded-lg mb-4 -mt-4">
                        {error}
                      </h1>
                    ) : (
                      <></>
                    )}
                  </div>
                  <hr className="mb-6 border-t" />
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default AddMedicalRecord;