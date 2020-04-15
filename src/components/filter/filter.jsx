import React, {useContext} from "react";
import cls from './filter.module.scss';
import {loadEffect} from "../../store/store";
// import { GamesContext } from "../../App";

function Filter() {
	const countElementsOnPage = [10, 30, 50];
	// const { setState } = useContext(GamesContext);
	function handleClick(e) {
		console.log('click')
		e.preventDefault();
		loadEffect()
	}
	const onSearch = (x) => {
		const value = x.target.value;
		console.log(x.target.value);
		// const filteredGames = games.filter( a => a.Name.en.includes(value) );
		// console.log('filter', games, togGames);
		// setState((state) => ({
		// 		...state,
		// 		games: state.allGames.slice(0,100).filter( a => a.Name.en.toLowerCase().includes(value) )
		// 	})
		// );
	}

	return (
		<form className={cls['filter']}>
			<button onClick={ handleClick }>Refresh</button>
			<input className={cls['filter__search']} onChange={onSearch} type="text" placeholder='Поиск'/>
			<select className={cls['filter__number']} name="" id="">
				{countElementsOnPage.map( value => <option value={value} key={value}>{value}</option> )}
			</select>
		</form>
	)
}

export default Filter
