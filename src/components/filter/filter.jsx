import React from "react";
import cls from './filter.module.scss';
import {
	loadEffect,
	setFilterCategory,
	searchChange,
	setNumberOfElementsOnPage,
	$numbersOfElementsOnPageValues,
	$categories,
	$searchForm
} from "../../store/store";
import {useStore} from "effector-react";

function Filter() {
	// Stores
	const searchValue = useStore($searchForm);
	const selectValues = useStore($numbersOfElementsOnPageValues);
	const categories = useStore($categories);

	console.log(searchValue)
	function handleClick(e) {
		console.log('click');
		e.preventDefault();
		loadEffect();
	}

	const onSearch = (event) => {
		// console.log(event.target.value)
		searchChange(event.target.value)
	};

	const onCategryChagne = (event) => {
		setFilterCategory(event.target.value)
	};

	const onNumbersChagne = (event) => {
		setNumberOfElementsOnPage(event.target.value)
	};

	return (
		<form className={cls['filter']}>
			<button className={cls['filter__refresh']} onClick={ handleClick }>&#8634;</button>
			<input className={cls['filter__search']} value={searchValue} onChange={onSearch} type="text" placeholder='Поиск'/>
			<select className={cls['filter__number']} onChange={onNumbersChagne} name="" id="">
				{selectValues.map( value => <option value={value} key={value}>{value}</option> )}
			</select>
			<select className={cls['filter__number']} onChange={onCategryChagne} name="" id="">
				{categories.map( ({ID, Name}) => <option value={ID} key={ID}>{ typeof Name === 'string' ? Name : Name.en }</option> )}
			</select>
		</form>
	)
}

export default Filter
