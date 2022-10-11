import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import NotFound from "../NotFound";
import { BsChatFill } from "react-icons/bs";
import { MdApproval } from "react-icons/md";
import { Link } from "react-router-dom";
import "firebase/firestore";
import SignOut from "../../components/SignOut";
import GoBack from "../../components/GoBack";
import { GiTakeMyMoney } from "react-icons/gi";
import { CgProfile } from "react-icons/cg";
import { collection, query, where, getDocs } from "firebase/firestore";
import { getFirestore } from "firebase/firestore";
import FullPageLoader from "../../components/FullPageLoader";
import Records from "../../components/Records";
import { AiFillSetting } from "react-icons/ai"
const PatientView = () => {
  const auth = useSelector((state) => state.auth);
  const [loaderShow, setLoaderShow] = useState(false);
  const [Requ, setRequ] = useState([{ id: 'a', hospital: "appolo@medchain.com", description: "Heart Attack last night" }]);
  let id = 0;
  console.log(auth);
  return (
    <>
      <SignOut />
      <FullPageLoader show={loaderShow} />
      <GoBack />
      <div
        className="h-screen w-screen text-white"
        style={{
          background:
            "linear-gradient(rgba(0,0,0,0.7),rgba(0,0,0,0.7))",
        }}
      >
        <div className="inline float-right">
          <Link to="/patient/manage">
            <AiFillSetting className="inline text-3xl mt-2 mr-5" />
          </Link>
        </div>
        <div className="flex justify-center content-center w-full">
          <h1 className="text-5xl font-montserrat mt-10">
            Welcome to Middlemen
          </h1>
        </div>
        <ul className="mt-10">
          {Requ.length > 0 ? (
            <li>
              <div className="ml-10 grid grid-cols-3 mb-10">
                <h1 className="text-white text-2xl">Hospital</h1>
                <h1 className="text-white text-2xl text-center">
                  Description
                </h1>
                <h1 className="text-white text-2xl text-center">
                  <button>View</button>
                </h1>
              </div>
            </li>
          ) : (
            <></>
          )}
          {Requ.map((grant) => {
            id++;
            return <Records key={id} grant={grant} />;
          })}
        </ul>
      </div>
    </>
  )
}

export default PatientView;