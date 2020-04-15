import {createStore, createEffect} from 'effector';

export const games = createStore([]);
export const loaded = createStore(false);

export const getRequest = createEffect('get request', {
	async handler() {
		return false
	}
});

export const loadEffect = createEffect('get games array',{
	async handler() {
		getRequest();
		const req = await fetch('https://alimzhanovamir.herokuapp.com/games');
		return req.json().then(res => {
			return res.games.sort( (a, b) => a.Name.en.localeCompare(b.Name.en) ).slice(0,50);
		});
	}
});



games.on(loadEffect.done, (state, {result}) => {
	return result
});

loaded.on(loadEffect.done, (state, {result}) => {
	return true
});

loaded.on(getRequest.done, (state, {result}) => {
	return false
});

window.games = games;

// fetch('https://alimzhanovamir.herokuapp.com/games')
// 	.then(res => {  return res.json() })
// 	.then(res => {
// 	.then(res => {
// 		console.log('get')
// 		for (let i = 0; i < 5; i++) {
// 			let x = (Math.random() * res.games.length).toFixed(0);
// 			randomTopGames.push( res.games[x] )
// 		}
//
// 		// Массив игр без тех что в топе
// 		const games = res.games.filter( game => {
// 			return randomTopGames.some(someGame => someGame.Name.en !== game.Name.en)
// 		}).sort( (a, b) => a.Name.en.localeCompare(b.Name.en) ).slice(0,100);
//
// 		setState({
// 			allGames: res.games,
// 			topGames: [...randomTopGames],
// 			games,
// 			setState
// 		});
// 		setLoadedFlag(true);
// 	});

