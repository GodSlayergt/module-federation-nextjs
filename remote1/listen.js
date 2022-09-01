import { useNavigate } from "react-router-dom"

const T = ()=>{const route = useNavigate()
window.addEventListener("message",(e)=>{
    if(e.data.url){
      route(e.data.url)
    }
  })
}

export default T