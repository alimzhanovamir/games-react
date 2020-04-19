import {createStore, createEffect, createEvent, combine} from 'effector';
// import {useStore} from "effector-react";

const selectValues = [15, 30, 50, 100];

// Stores:
export const $games = createStore([]);
export const $totalGames = createStore(0);
export const $foundGames = createStore(0);
export const $filterGames = createStore([]);
export const $loaded = createStore(false);
export const $localStorage = createStore([]);

// Filter stores:
export const $numbersOfElementsOnPageValues = createStore(selectValues);
export const $categories = createStore([]);
export const $paginationCount = createStore([1]);

// Filter elements stores:
export const $searchForm = createStore('');
export const $currentCategoryID = createStore('');
export const $numbersOfElementsOnPage = createStore( selectValues[0] );
export const $numberOfElementsOnPage = createStore( selectValues[0] );
export const $currentPage = createStore(1);
export const $numberOfPages = createStore(1);
export const $filterData = combine({
	$games,
	$numberOfPages,
	$searchForm,
	$currentCategoryID,
	$numberOfElementsOnPage,
	$currentPage,
	$localStorage
});


// Events:
export const setTotalGames = createEvent();
export const setFoundGames = createEvent();
export const setCategories = createEvent();
export const searchChange = createEvent();
export const setFilterCategory = createEvent();
export const setNumberOfElementsOnPage = createEvent();
export const setPagesCount = createEvent();
export const setNumberOfPages = createEvent();
export const setToLocalStorage = createEvent();

// Effects:
export const getRequest = createEffect('get request', {
	async handler() {
		return false
	}
});

// Load data effect
export const loadEffect = createEffect('get games array',{
	async handler() {
		await getRequest();
		const req = await fetch('https://alimzhanovamir.herokuapp.com/games');
		return await req.json();
	}
});

// On loadEffect done
$games.on(loadEffect.done, (state, {result}) => {
	const games = result.games;

	const arrayFromMerchantsObjects = Object.keys( result.merchants ).map(function ( key) {
		return { ...result.merchants[key] };
	});

	const categoriesArray = [...clearCategoiersArray(result.categories), ...clearCategoiersArray(arrayFromMerchantsObjects)]
		.sort( ({Name: a}, {Name: b} ) => {
			return a.localeCompare(b)
		});

	setCategories( [{ID: '', Name: 'All'}, {ID: 'favorites', Name: 'Favorites'}, ...categoriesArray] );
	setTotalGames(games.length);
	return games
});

$totalGames.on(setTotalGames, (state, gamesCount) => gamesCount);
$foundGames.on(setFoundGames, (state, findedGames) => findedGames);
// Set categories in store
$categories.on(setCategories, (state, result) => result);

// Set loaded status
$loaded
	// Set loaded status if request done
	.on(loadEffect.done, (state, {result}) => true )
	// Set loaded status when sent a request
	.on(getRequest.done, (state, {result}) => false );


$searchForm.on(searchChange, (state, result) => {
	setNumberOfPages(1);
	return result.toLowerCase()
} );

$currentCategoryID.on(setFilterCategory, (state, result) => {
	setNumberOfPages(1);
	return result
});

$numberOfElementsOnPage.on(setNumberOfElementsOnPage, (state, result) => {
	setNumberOfPages(1);
	return result
});

$numberOfPages.on(setNumberOfPages, (state, pageNumber) => pageNumber );

//
$filterGames.on($filterData,(state, result) => {
	const localStorage = $localStorage.getState();
	const searchString = $searchForm.getState();
	const category = $currentCategoryID.getState();
	let games = $games.getState();

	if ( searchString !== '' ) {
		games = games.filter( ({Name}) => {
			const gameNameString = (typeof Name === 'string' ? Name : Name.en).toLowerCase();
			return gameNameString.includes(searchString);
		})
	}

	if ( category !== '' && category !== 'favorites' ) {
		games = games.filter( ({CategoryID}) => {
			return category ? CategoryID.includes( category ) : true
		})
	}

	if ( category === 'favorites' ) {
		games = games.filter( ({ID}) => {
			return category ? localStorage.includes( ID ) : true
		})
	}

	games = games.sort( ({Name: a}, {Name: b} ) => {
		return a.en.localeCompare(b.en)
	});

	setPagesCount( games.length );
	const numberOfElementsOnPage = $numberOfElementsOnPage.getState()
	const numberOfPages = $numberOfPages.getState();

	let indexFirstElementOfPage = (numberOfPages - 1) * numberOfElementsOnPage

	const indexLastElementOfPage = numberOfPages * numberOfElementsOnPage;

	// console.log(indexFirstElementOfPage, indexLastElementOfPage)
	const res = games.slice( indexFirstElementOfPage, indexLastElementOfPage)
	// console.log(res)
	setFoundGames(games.length)
	return res
});

$paginationCount.on(setPagesCount, (state, numberOfGames) => {
	let pages = 0;
	const arr = [];

	if ( numberOfGames > 0 ) {
		let x = numberOfGames / $numberOfElementsOnPage.getState()
		pages = Math.ceil( x);
	}

	if ( pages > 1 ) {
		for (let i = 0; i < pages; i++) {
			arr.push(i+1)
		}
	}
	else if ( pages === 1 ) {
		arr.push(1)
	}

	return arr
});

// Set to localStorage
$localStorage.on(setToLocalStorage, (state, storage) => {
	localStorage.setItem('favorites', JSON.stringify(storage) );
	return JSON.parse( localStorage.getItem('favorites') );
})

// Util function
function clearCategoiersArray(array) {
	return array.map( ({ID, Name: rawName}) => {
		const Name = typeof rawName === 'string' ? rawName : rawName.en;
		return {ID, Name}
	});
}
