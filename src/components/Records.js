import React,{useState} from "react";
import FullPageLoader from "./FullPageLoader";

const Records = (props) => {
  const [loader,setLoader] = useState(false);
  const downloadRecord = () =>{

  }

  return (
    <li>
    <FullPageLoader show={loader} />
    <div className="ml-10 grid grid-cols-3 mb-5">
      <h1 className="text-white text-xl">{props.grant.hospital}</h1>
      <h1 className="text-white text-xl">{props.grant.description}</h1>
      <h1 className="text-white text-xl">hello</h1>
    </div>
</li>
  )
}

export default Records;