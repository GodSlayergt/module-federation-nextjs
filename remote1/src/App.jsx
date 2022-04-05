import React, { useState } from 'react';
import   './App.css'
function App({heading,count}) {
  const[counter,setCount] = useState(count||0)
  const press = ()=>{
    setCount(counter+1)
  }
  return (
    <div className="widget">
    <div className="counter">{heading||"Gt"}</div>
    <div className="display">
      Count is : {counter||0}
    </div>
    <button className="inc" onClick = {press}>Goals Portal</button>
  </div>

  );
}

export default App;