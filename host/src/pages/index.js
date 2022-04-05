import Load from "../../loader";
import Link from "next/link";
import { useState } from "react";
// import dynamic from "next/dynamic"
// const Component = Load("remote1","./widget")
// const Component3 = Load("remote1","./child")
const Component2 = Load("remote2","pagination")
// Load("remote1","./widget")
// const Component = dynamic(()=>{
//   if(typeof window!=='undefined')
//  return window.remote1.get('./widget').then((f)=>f())
// },{ssr:false})
// let Component = (<div></div>)
// if(typeof window!=='undefined')
//  Component = window.remote1.get('./widget').then((f)=>f())
// const  Component = dynamic(()=>import("remote1/widget"))

export default function Home({ data }) {
 const [count,setCount] =  useState(0)
  return (
    <div>
      Next
      <div id="container"></div>
      {/* <Component count={4}/> */}
      {/* <Component3/> */}
      <Link href="/test"><a>GOdfdsfs</a></Link>
      <div>
      <Component2/>
      <button onClick={()=>setCount(count+1)}>changestate{count}</button>
      </div>
    </div>
  );
}






