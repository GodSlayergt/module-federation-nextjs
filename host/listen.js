import { useRouter} from "next/router"

const T = ()=>{const route = useRouter()

    if(typeof window !=="undefined"){
window.addEventListener("route",(e)=>{
 
    if(e.detail.url!=null){
  
      route.push(e.detail.url)
    }
  })
}
}

export default T