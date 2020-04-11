import React, { useState, useEffect } from 'react';
import './App.scss';
import Layout from "./layout/layout";

function App() {

  const [state, setState] = useState(false);
  const [favoriteGames, setFavoriteGames] = useState([]);
  const favoritesRandomGames = [];

  // function getRandomGame(min, max) {
  //   return Math.random() * (max - min) + min;
  // }

  useEffect(()=> {
    fetch('https://www.gbchip.com/api/v1/games')
      .then(res => {  return res.json() })
      .then(res => {
        for (let i = 0; i < 5; i++) {
          let x = (Math.random() * res.games.length).toFixed(0);
          favoritesRandomGames.push( res.games[x] )
        }
        console.log(favoritesRandomGames)
        setFavoriteGames(favoritesRandomGames);

        const games = res.games.filter( game => (
          favoritesRandomGames.some( someGame => someGame.Name.en !== game.Name.en )
        )).sort( (a, b) => a.Name.en.localeCompare(b.Name.en) );

        setTimeout(()=> setState(games), 1000);
      })
  }, []);

  useEffect(()=> {
    console.log(state)
  },[state]);

  useEffect(()=> {
    console.log(favoritesRandomGames)
  },[favoriteGames]);

  return (
    <Layout state={state} favoriteGames={favoriteGames}/>
  );

}

export default App;
