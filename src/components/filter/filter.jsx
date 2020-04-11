import React from "react";
import cls from './filter.module.scss';

function Filter() {
	const countElementsOnPage = [10, 30, 50];

	return (
		<form className={cls['filter']}>
			<input className={cls['filter__search']} type="text" placeholder='Поиск'/>
			<select className={cls['filter__number']} name="" id="">
				{countElementsOnPage.map( value => <option value={value} key={value}>{value}</option> )}
			</select>
		</form>
	)
}

export default Filter
