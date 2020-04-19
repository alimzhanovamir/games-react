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

	const onSearch = (event) => {
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
			<input className={cls['filter__search']}
						 value={searchValue}
						 onChange={onSearch}
						 type="search" placeholder="Поиск"
						 aria-label="Search"/>
			<div className={cls['filter__selection']}>
				<select className={`${cls['filter__number']} ${cls['filter__number--wide']}`}
								onChange={onCategryChagne}
								name=""
								id=""
								aria-label="Categories">
					{categories.map( ({ID, Name}) => <option value={ID} key={ID}>{ typeof Name === 'string' ? Name : Name.en }</option> )}
				</select>
				<select className={cls['filter__number']}
								onChange={onNumbersChagne}
								name=""
								id=""
								aria-label="Number of games per page">
					{selectValues.map( value => <option value={value} key={value}>{value}</option> )}
				</select>
			</div>
		</form>
	)
}

export default Filter
