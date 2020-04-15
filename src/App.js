import React, { useState, useEffect } from 'react';
import './App.scss';
import Layout from './layout/layout';
import { loadEffect } from "./store/store";
import { games } from "./store/store";
import {useStore} from "effector-react";

function App() {
  const gamesList = useStore(games);
  const [state, setState] = useState({});
  const [loadedFlag, setLoadedFlag] = useState(false);
  const randomTopGames = [];

  useEffect(()=> {
    console.log('mount App');
    loadEffect();
  }, []);

  // useEffect(()=> {
  //   if (state) {
  //     setLoadedFlag(true);
  //   }
  // },[state]);

  console.log('render App');
  console.log(gamesList);
  console.log('_______');
  return (
    <Layout/>
  );

}

export default App;
