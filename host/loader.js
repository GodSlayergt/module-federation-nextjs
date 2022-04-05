import dynamic from "next/dynamic";



function loadComponent(scope, module) {
  return async () => {
    if(window[scope]._initialized){
      console.log(window[scope],"initialized")
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

const Load = (scope, module) => {
  return dynamic(loadComponent(scope, module), { ssr: false });
};



export const  LoadScripts = ()=>{
  return Object.entries(process.env.remotes).map(([key,url])=>{
   return  <script src={url} key={key} async/>
  })

}

export default Load;