import React, { useEffect } from 'react';
import './App.scss';
import Layout from './layout/layout';
import { loadEffect } from "./store/store";

function App() {
  useEffect(()=> {
    console.log('mounted App');
    loadEffect();
  }, []);

  console.log('render App');
  return (
    <Layout/>
  );

}

export default App;
