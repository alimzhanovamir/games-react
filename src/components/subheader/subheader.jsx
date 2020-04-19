import React from "react";
import cls from './subheader.module.scss';
import {useStore} from "effector-react";
import {$foundGames} from "../../store/store";

function Subheader(props) {
	const foundGames = useStore($foundGames)
	return (
		<header className={cls['subheader']}>
			<h1 className={cls['subheader__title']}>{props.title}</h1>
			<span className={cls['subheader__found']}>{`Found games: ${foundGames}`}</span>
		</header>
	)
}

export default Subheader
