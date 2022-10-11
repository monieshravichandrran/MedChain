import React, { useState } from "react";
import FullPageLoader from "./FullPageLoader";
import { TiTick } from "react-icons/ti";
import { ImCross } from "react-icons/im";
import firebase from "../firebaseConfig";
import { useSelector } from "react-redux";
import { collection, query, where, getDocs, getFirestore } from "@firebase/firestore";

const PermissionGrant = (props) => {
  const [loaderShow, setLoaderShow] = useState(false);
  const auth = useSelector((state) => state.auth);

  const tickClick = async () => {
    setLoaderShow(true);
    let reqs = [];
    const getPermissions = async () => {
      console.log(auth.user.email);
      console.log(props.grants.from);
      const db = getFirestore();
      const permissionsRef = collection(db, "permissions");
      const q = query(
        permissionsRef,
        where("email", "==", auth.user.email),
        where("grant", "==", props.grants.from)
      );
      const querySnapshot = await getDocs(q);
      querySnapshot.forEach((doc) => {
        reqs.push({
          id: doc.id,
          data: doc.data(),
        });
      });
    };
    await getPermissions();
    console.log(reqs);
    if (reqs.length === 0) {
      await firebase
        .firestore()
        .collection("permissions")
        .doc()
        .set({ email: auth.user.email, grant: props.grants.from });
      const doc = await firebase
        .firestore()
        .collection("requests")
        .where("email", "==", auth.user.email)
        .get();
      doc.forEach((element) => element.ref.delete());
    } else alert("Permission already granted");
    props.deleteRequest();
    setLoaderShow(false);
  };
  const wrongClick = async () => {
    setLoaderShow(true);
    const doc = await firebase
      .firestore()
      .collection("requests")
      .where("email", "==", auth.user.email)
      .get();
    doc.forEach((element) => element.ref.delete());
    props.deleteRequest();
    setLoaderShow(false);
  };
  return (
    <li>
      <FullPageLoader show={loaderShow} />
      <div className="ml-10 grid grid-cols-3 mb-5">
        <h1 className="text-white text-xl">{props.grants.from}</h1>
        <button
          className="h-7 w-7 rounded-full ring-2 ring-white text-white bg-green-500 p-1 text-xl"
          onClick={tickClick}
        >
          <TiTick />
        </button>
        <button
          className="h-7 w-7 rounded-full ring-2 ring-white text-white bg-red-500 p-2 text-xs"
          onClick={wrongClick}
        >
          <ImCross />
        </button>
      </div>
    </li>
  );
};

export default PermissionGrant;
