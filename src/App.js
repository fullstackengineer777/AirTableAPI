import logo from './logo.svg';
import './App.css';
import Login from './Login.js';
import React, {useState} from "react";
import Page from './Page';
import { BrowserRouter as Router , Routes, Route, Link } from "react-router-dom";


function App() {
  const [arrData, setArrData] = useState([]);

  function handle(arr){

    setArrData(arr);
  console.log("parent", arr);
  }
  return (
    <Router>
       <Routes>      
        <Route path="/page" element={<Page data={arrData} />} />
        <Route exact path='/' element={<Login parentTo={handle}  />} />
      </Routes>
   </Router> );
}

export default App;
