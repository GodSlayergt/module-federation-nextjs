import Load from "../../loader";
import Link from "next/link";
import { useState } from "react";

const Component2 = Load("remote2","pagination")


export default function Home({ data }) {
 const [count,setCount] =  useState(0)
  return (
    <div>
      Next
      <div id="container"></div>
      <Link href="/test"><a>widget</a></Link>
      <div>
      <Component2/>
      <button onClick={()=>setCount(count+1)}>changestate{count}</button>
      </div>
    </div>
  );
}






