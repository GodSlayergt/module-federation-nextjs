// import dynamic from "next/dynamic"
// const L = async ()=>{
//   const t = await fetch("http://localhost:4000/remoteEntry.js")
//   const k = await t.text()
//   // console.log('dsfS',k)    
//   eval(`${k} \\n try{remote1}catch)
//     // const script = document.createElement('script')
//     // script.setAttribute('dangerouslySetInnerHTML',JSON.stringify({__html:k.toString()}))
//     // document.head.append(script)
// }
// // dynamic(()=>L(),{ssr:false})
// if(typeof window !== "undefined"){
//   console.log("dfdsf")
//   L()
// }


function MyApp({ Component, pageProps }) {
  return <Component {...pageProps} />
}

export default MyApp
