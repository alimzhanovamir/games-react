import React from "react";
import cls from './header.module.scss';
import Filter from "../filter/filter";

function Header() {

	return (
		<header className={cls['header']}>
			<h1 className={cls['header__title']}>Игры</h1>
			<Filter/>
		</header>
	)
}

export default Header
