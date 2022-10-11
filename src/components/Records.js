import React,{useState} from "react";
import FullPageLoader from "./FullPageLoader";

const Records = (props) => {
  const [loader,setLoader] = useState(false);
  const downloadRecord = () =>{

  }

  return (
    <li>
    <FullPageLoader show={loader} />
    <div className="grid grid-cols-3 mb-5">
      <h1 className="text-white text-xl text-center">{props.grant.data.hospital}</h1>
      <h1 className="text-white text-xl text-center">{props.grant.data.description}</h1>
      <h1 className="text-white text-xl text-center"><a href={props.grant.data.document} target="_blank">View</a></h1>
    </div>
</li>
  )
}

export default Records;