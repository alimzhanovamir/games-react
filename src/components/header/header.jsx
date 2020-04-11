import React from "react";
import cls from './header.module.scss';

function Header() {

	return (
		<header className={cls['header']}>
			<h1 className={cls['header__title']}>Игры</h1>
		</header>
	)
}

export default Header
