import React,{useState} from "react";
import FullPageLoader from "./FullPageLoader";

const Records = (props) => {
  const [loader,setLoader] = useState(false);
  const downloadRecord = async() =>{
    setLoader(true);
    // acc = [];
    // acc1 = [];
    // const fn = async () => {
    //     const db = getFirestore();
    //     const usersRef = collection(db, "users");
    //     const q = query(
    //         usersRef,
    //         where("email", "==", props.grants.data.from)
    //     );
    //     const querySnapshot = await getDocs(q);
    //     querySnapshot.forEach((doc) => {
    //         acc.push({
    //             id: doc.id,
    //             data: doc.data(),
    //         });
    //     });
    // };
    // const fn1 = async () => {
    //     const db1 = getFirestore();
    //     const usersRef1 = collection(db1, "users");
    //     const q1 = query(
    //         usersRef1,
    //         where("email", "==", props.grants.data.patient)
    //     );
    //     const querySnapshot1 = await getDocs(q1);
    //     querySnapshot1.forEach((doc1) => {
    //         acc1.push({
    //             id: doc1.id,
    //             data: doc1.data(),
    //         });
    //     });
    // };
    // await fn();
    // await fn1();
    // let asciiArray = await contract.methods
    //     .getDS(acc1[0].data.address, acc[0].data.address)
    //     .call({ from: accounts[0] });
    // console.log(acc, accounts, asciiArray);
    // const cid = convertToString(asciiArray);
    // const url = `https://ipfs.io/ipfs/${cid}`;
    // const link = document.createElement("a");
    // link.href = url;
    // link.target = "_blank";
    // link.setAttribute("download", "file.pdf");
    // document.body.appendChild(link);
    // link.click();
    // setLoader(false);
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