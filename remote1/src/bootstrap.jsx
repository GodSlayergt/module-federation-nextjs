import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import ReactDOMServer from 'react-dom/server';
import reportWebVitals from './reportWebVitals';



const render = (app)=>{

  
ReactDOM.render(

  <App heading="Test" count={0}/>
,
document.getElementById(app)
);

}

// ReactDOM.render(

//   <App heading="Test" count={0}/>
// ,
// document.getElementById("container")
// );

export default render

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
