import React,{useState} from "react";
import FullPageLoader from "./FullPageLoader";
import { TiTick } from "react-icons/ti";
import { ImCross } from "react-icons/im";

const PermissionGrant = (props) => {
  const [loaderShow, setLoaderShow] = useState(false);

  const tickClick = () => {

  }
  const wrongClick = () => {

  }
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
  )
}

export default PermissionGrant;