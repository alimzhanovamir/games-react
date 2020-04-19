import React from "react";
import cls from './header.module.scss';
import Filter from "../filter/filter";
import {useStore} from "effector-react";
import {$totalGames} from "../../store/store";

function Header() {
	const totalGames = useStore($totalGames)
	return (
		<header className={cls['header']}>
			<h1 className={cls['header__title']}>{`Total games: ${totalGames}`}</h1>
			<Filter/>
		</header>
	)
}

export default Header
