import React, { useEffect } from 'react';
import './App.scss';
import Layout from './layout/layout';
import {loadEffect, setToLocalStorage} from "./store/store";

function App() {
  console.log('localStorage =', JSON.parse( localStorage.getItem('favorites') ))
  if ( !JSON.parse( localStorage.getItem('favorites') ) ) {
    setToLocalStorage([])
  }
  else {
    setToLocalStorage(JSON.parse( localStorage.getItem('favorites') ))
  }

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
