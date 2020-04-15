import React, { useContext } from "react";
import cls from './list.module.scss';
import GameCard from "../game-card/game-card";
import {useStore} from "effector-react";
import {games} from "../../store/store";

function List() {
	const gamesList = useStore(games);
	return (
		<ul className={cls['list']}>

			{/*{topGames.map( game => (*/}
			{/*		<li className={cls['list__item']} key={game.ID}>*/}
			{/*			<GameCard*/}
			{/*				imageSrc={game.ImageFullPath}*/}
			{/*				name={game.Name.en} modClass={true}/>*/}
			{/*		</li>*/}
			{/*	)*/}
			{/*)}*/}

			{gamesList.map( game => (
					<li className={cls['list__item']} key={game.ID}>
							<GameCard
								imageSrc={game.ImageFullPath}
								name={game.Name.en}/>
					</li>
				)
			)}
		</ul>
	)
}

export default List
