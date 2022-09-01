import Load from "../../loader";
import Link from "next/link";
import { useState } from "react";
import LoadRemoteComponent from "../../loader";

// const Component2 = Load("remote2","pagination")


export default function Home({ data }) {
 const [count,setCount] =  useState(0)
  return (
    <div>
      Next
      <div id="container">
       <LoadRemoteComponent  url="http://localhost:4000/remoteEntry.js" scope="remote1" module="./widget"/>
       <LoadRemoteComponent  url="http://localhost:4001/remoteEntry.js" scope="remote2" module="./pagination"/>
      </div>
    </div>
  );
}






