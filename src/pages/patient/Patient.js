import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import NotFound from "../NotFound";
import SignOut from "../../components/SignOut";
import GoBack from "../../components/GoBack";
import PermissionGrant from "../../components/PermissionGrant";
import { Link } from "react-router-dom";
import { collection, getDocs, getFirestore, query, where } from "firebase/firestore";
import { AiFillSetting } from "react-icons/ai"
const Patient = () => {
  const auth = useSelector((state) => state.auth);
  const [Requ, setRequ] = useState([]);
  let id = 0;
  useEffect(() => {
    const setRequests = async () => {
      let reqs = [];
      const db = getFirestore();
      const usersRef = collection(db, "requests");
      const q = query(usersRef, where("email", "==", auth.user.email));
      const querySnapshot = await getDocs(q);
      querySnapshot.forEach((doc) => {
        console.log(doc.id);
        reqs.push({
          id: doc.id,
          data: doc.data(),
        });
      });
      setRequ(reqs);
    };
    setRequests();
  }, []);

  const deleteRequest = (id) => {
    let reqs = Requ;
    reqs.splice(reqs.indexOf(id), 1);
    setRequ(reqs);
  };

  return (
    <>
      <>
        <SignOut />
        <GoBack />
        <div
          className="h-screen w-screen text-white"
          style={{
            background: "linear-gradient(rgba(0,0,0,0.7),rgba(0,0,0,0.7))",
          }}
        >
          <div className="inline float-right">
            <Link to="/patient/manage">
              <AiFillSetting className="inline text-3xl mt-2 mr-5" />
            </Link>
          </div>
          <div className="flex justify-center content-center w-full">
            <h1 className="text-5xl font-montserrat mt-10">Welcome to Middlemen</h1>
          </div>
          <div className="flex justify-center">
            <Link to="/patient/view" className="text-xl mt-10 hover:text-red-500">
              View your older medical records
            </Link>
          </div>
          <div className="flex justify-center content-center w-full">
            <p className="text-3xl mt-5 font-montserrat">You have {Requ.length} Request</p>
          </div>

          <div className="flex justify-center content-center w-full mt-20">
            <ul>
              {Requ.length > 0 ? (
                <li>
                  <div className="ml-10 grid grid-cols-3 mb-10">
                    <h1 className="text-white text-2xl mr-20">Hospital Name</h1>

                    <h1 className="text-white text-2xl mr-20">Accept</h1>
                    <h1 className="text-white text-2xl mr-20">Reject</h1>
                  </div>
                </li>
              ) : (
                <></>
              )}
              {Requ.map((grant) => {
                id++;
                return (
                  <PermissionGrant key={id} grants={grant.data} deleteRequest={deleteRequest} />
                );
              })}
            </ul>
          </div>
        </div>
      </>
    </>
  );
};

export default Patient;
