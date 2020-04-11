import React, { useState, useEffect } from 'react';
import './App.scss';
import Layout from "./layout/layout";

function App() {

  const [state, setState] = useState(false);

  useEffect(()=> {
    fetch('https://www.gbchip.com/api/v1/games')
      .then(res => {  return res.json() })
      .then(res => {
        console.log(res.games);
        setTimeout(()=> setState(res.games), 1000);
      })
  }, []);

  return (
    <Layout state={state}/>
  );

}

export default App;
