import React, { useState, useEffect } from 'react';
import './App.scss';
import Layout from "./layout/layout";

export const GamesContext = React.createContext();

function App() {

  const [state, setState] = useState({});
  const [loadedFlag, setLoadedFlag] = useState(false);
  const randomTopGames = [];

  useEffect(()=> {
    fetch('https://alimzhanovamir.herokuapp.com/games')
      .then(res => {  return res.json() })
      .then(res => {
        console.log('get')
        for (let i = 0; i < 5; i++) {
          let x = (Math.random() * res.games.length).toFixed(0);
          randomTopGames.push( res.games[x] )
        }

        // Массив игр без тех что в топе
        const games = res.games.filter( game => {
          return randomTopGames.some(someGame => someGame.Name.en !== game.Name.en)
        }).sort( (a, b) => a.Name.en.localeCompare(b.Name.en) ).slice(0,100);

        setState({
          allGames: res.games,
          topGames: [...randomTopGames],
          games,
          setState
        });
        setLoadedFlag(true);
      });
  }, []);

  // useEffect(()=> {
  //   if (state) {
  //     setLoadedFlag(true);
  //   }
  // },[state]);

  console.log('render App');
  return (
    <GamesContext.Provider value={state}>
      <Layout loadedFlag={loadedFlag}/>
    </GamesContext.Provider>
  );

}

export default App;
