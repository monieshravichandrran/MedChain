import React, { useState, useEffect } from 'react';
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
import { Web3Storage } from 'web3.storage'

const RemoveAccess = () => {
  const auth = useSelector((state) => state.auth);
  const [show, setShow] = useState(false);
  const [records, setRecords] = useState([]);
  const [loaderShow, setLoaderShow] = useState(false);
  useEffect(() => {
    const db = getFirestore();
    const usersRef = collection(db, "permissions");
    const q = query(
      usersRef,
      where("email", "==", auth.user.email),
    );
    let reqs = []
    getDocs(q).then((querySnapshot) => {
      querySnapshot.forEach((doc) => {
        reqs.push({
          id: doc.id,
          data: doc.data(),
        });
      });
      setRecords(reqs);
      console.log(reqs);
      setShow(true);
    })
  }, [])
  return (
    <>
      {show ? <>
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
                      Manage Access to Hospitals
                    </h3>
                    <p className="mb-4 text-sm text-white">
                      Below is the list of Hospitals that have access to your chain. You can <br></br>
                      remove access and manage them
                    </p>
                  </div>
                  <div className="px-8 mb-4 text-center text-3xl mt-8">
                    <h1 className='mt-4 text-green-500'>Hospitals that have access</h1>
                    {records.map((item, index) => {
                      return (
                        <div className="inline mt-10">
                          <h1 className='inline text-xl mt-4 mr-4'>{index + 1} . {item.data.grant}</h1>
                          <button onClick={async () => {
                            //collection("permissions").doc(item.id).delete();
                            let fs = firebase.firestore();
                            let collectionRef = fs.collection("permissions");
                            collectionRef.where("email", "==", auth.user.email)
                              .where("grant", "==", item.data.grant)
                              .get().then(querySnapshot => {
                                querySnapshot.forEach((doc) => {
                                  doc.ref.delete().then(() => {
                                    console.log("Document successfully deleted!");
                                  }).catch(function (error) {
                                    console.error("Error removing document: ", error);
                                  });
                                });
                              })
                              .catch(function (error) {
                                console.log("Error getting documents: ", error);
                              });
                          }} className='text-white bg-red-500 p-2 text-xs'>Remove Access</button>
                        </div>
                      )
                    })}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </> : null}
    </>
  )
}

export default RemoveAccess;