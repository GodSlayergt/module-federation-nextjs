const sessionValues = {}
sessionValues["widget-div-ids"] = [sessionStorage.getItem("usbheader"),sessionStorage.getItem("side-widget")]
class Load{

    constructor(id){
        this.id = id
        const render_div = document.getElementById(this.id)
        this.namespace = render_div.getAttribute("data-namespace")
        this.data = null
        this.domain = new URL(render_div.getAttribute("data-manifestpath"))
        this.appdata=JSON.parse(render_div.getAttribute("data-appdata"))
        
    }

    load = async ()=> {
        if(this.data){
          return this.data
        }
        const response = await fetch(this.domain.href);
        if (!response.ok) {
          return 'Fail';
        }
        this.data = await response.json();
        return this.data;
      }
      mount = ()=> {
        if(!this.data){
          return 
        }
        for (var key of Object.keys(this.data)) {
         
          if (key==="main.js") {
            this.data[key] = this.domain.origin+this.data[key]
            const script = document.createElement('script');
            script.src = this.data[key];
            script.id = 'load-widget';
            script.defer = true;
            document.body.appendChild(script);
            script.onload = () => {
              if (window && this.namespace in window) {
                window[this.namespace].default.render(
                  {
                    selector:'#'+this.id,
                    props:this.appdata
                  }
                );
              }
            };
          }
        }
      }
}


window.onload = function(){
  sessionValues["widget-div-ids"].map((id)=>{
    const t = new Load(id)
    t.load().then((res)=>{
    t.mount(res)
  }).catch((e)=>console.log(e))
  })
  
}