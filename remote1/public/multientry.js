class Load {
    constructor() {
      this.data = null;
      this.domain = new URL("http://localhost:5003/manifest.json" );
    }
  
    load = async () => {
      if (this.data) {
        return this.data;
      }
      const response = await fetch(this.domain.href);
      if (!response.ok) {
        return "Fail";
      }
      this.data = await response.json();
      return this.data;
    };
    
    mountOnContainers = () => {
      const containers = document.querySelectorAll("div[data-widget-variation]");
      console.log(containers)
      containers.forEach((ele) => {
        const namespace = ele.getAttribute("data-widget-variation");
        const selector = `div[data-widget-variation=${namespace}]`;
        const key = namespace + ".js";
        const appdata = JSON.parse(ele.getAttribute("data-appdata"));
        this.mount(key, selector, namespace, appdata);
      });
    };
  
    
    mount = (key, selector, namespace, appdata) => {
      if (!this.data) {
        return;
      }
  
      const script = document.createElement("script");
      script.src = this.domain.origin + this.data[key];
      script.id = "load-widget";
      script.defer = true;
      document.body.appendChild(script);
      script.onload = () => {
        if (window && this.namespace in window) {
          window["footerApp"][namespace].default.render({
            selector: selector,
            props: appdata, 
          });
        }
      };
    };

  }
  
  window.onload = function () {
    const t = new Load();
    t.load().then((res)=>{
        t.mountOnContainers()
    })
  };
  