import './App.css';

function App() {
  const temp = ()=>{
    const res = []
 
    for(var i=0;i<5;i++){
      res.push(<div data-a4e-widget-variation={`slim-${i}`} data-a4e-widget-namespace="footerApp" key={i} style ={{marginBottom:"10px"}}  data-a4e-widget-appdata='{"heading":"Slim","count":0}'></div>)
    }
    return res
  } 

  return (
    <div className="App">
      <div data-a4e-widget-variation="full" data-a4e-widget-namespace="footerApp" style ={{marginBottom:"10px"}}  data-a4e-widget-appdata='{"heading":"Full","count":0}'></div> 
      <div data-a4e-widget-variation="slim" data-a4e-widget-namespace="footerApp" style ={{marginBottom:"10px"}}  data-a4e-widget-appdata='{"heading":"Slim","count":0}'></div>
       <div style ={{float:"right"}}>{temp()}</div>
    </div>
  );
}

export default App;
