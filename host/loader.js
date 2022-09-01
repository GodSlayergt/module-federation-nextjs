import dynamic from "next/dynamic";
import React from 'react'
import { Suspense, useEffect, useState } from "react";

const cache = new Map()
const scriptCache = new Set()

const useDynamicRemote = (url,scope,module)=>{
const key = url+scope+module
const [ready,error] = useLoadScript(url)
const [Component,setComponent] = useState(null)

useEffect(()=>{
if(Component) setComponent(null)
},[key])

useEffect(()=>{
  if(ready && !Component){
    const temp = dynamic(loadComponent(scope,module))
    cache.set(key,temp)
    setComponent(temp)
  }
},[Component,ready,key])
return [error,Component]
}

const useLoadScript = (url) => {

  const [ready,setReady] = useState(false)
  const [error,setError] = useState(false)
  useEffect(()=>{
    if(!url){
      return 
    }
    if(scriptCache.has(url)){
      setReady(true)
      setError(false)
      return
    }
    setReady(false)
    setError(false)
    const script = document.createElement("script");
    script.src = url;
    script.type = 'text/javascript'
    script.async=true
    script.onload = ()=>{
      scriptCache.add(url)
      setReady(true)
    }
    script.onerror=()=>{
      setReady(false)
      setError(true)
    }
    document.head.append(script)
    return()=>{
      scriptCache.delete(script)
      document.head.removeChild(script)
    }
  },[url])
 
  return [ready,error]
};

function loadComponent(scope, module) {
  return async () => {
    if(window[scope]._initialized){
      const factory = await window[scope].get(module);
      const Module = factory();
      return Module;

    }
    else{
    await __webpack_init_sharing__('default');
    const container = window[scope];
    await container.init(__webpack_share_scopes__.default);
    const factory = await window[scope].get(module);
    const Module = factory();
    window[scope]._initilized = true;
    return Module;
    }
  };
}

// const Load = (url,scope, module) => {
//   return dynamic(loadComponent(url,scope, module), { ssr: false });
// };


const LoadRemoteComponent = ({url,scope,module})=>{
  const [error,Component] = useDynamicRemote(url,scope,module)
  if(error){
    return <div>Error</div>
  }
  if(!Component){
    return <div>Loading2</div>
  }
  return<Suspense fallback="Loading"><Component/></Suspense> 
}


// export const  LoadScripts = ()=>{
//   return Object.entries(process.env.remotes).map(([key,url])=>{
//    return  <script src={url} key={key} async/>
//   })

// }

export default LoadRemoteComponent;