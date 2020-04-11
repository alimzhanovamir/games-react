import React, { useContext } from "react";
import cls from './list.module.scss';
import GameCard from "../game-card/game-card";
import {GamesContext} from "../../App";

function List() {
	const { games, topGames } = useContext(GamesContext);
	console.log('log',games,topGames)
	return (
		<ul className={cls['list']}>

			{topGames.map( game => (
					<li className={cls['list__item']} key={game.ID}>
						<GameCard
							imageSrc={game.ImageFullPath}
							name={game.Name.en} modClass={true}/>
					</li>
				)
			)}

			{games.map( game => (
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
