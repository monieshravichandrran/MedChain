import React from "react";
import { useSelector, useDispatch } from "react-redux";
import NotFound from "../NotFound";

const Patient = () => {
  const auth = useSelector((state) => state.auth);
  console.log(auth);
  return (
    <>
      {auth.type == -1 ? <NotFound />
        :
        <h1 className="text-white">Patient page</h1>
      }
    </>
  )
}

export default Patient;