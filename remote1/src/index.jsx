import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import ReactDOMServer from 'react-dom/server';
import reportWebVitals from './reportWebVitals';
import { BrowserRouter, Route, Routes } from 'react-router';



const render = (app)=>{

  
ReactDOM.render(
<BrowserRouter>
<Routes>
  <Route href="/"> <App heading="Test" count={0}/></Route>
</Routes>
  </BrowserRouter>
,
document.getElementById(app)
);

}


export default render

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
