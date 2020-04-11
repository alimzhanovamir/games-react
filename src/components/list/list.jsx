import React from "react";
import cls from './list.module.scss';
import GameCard from "../game-card/game-card";

function List({games, favoriteGames}) {
	console.log(games[0]);
	return (
		<ul className={cls['list']}>

			{favoriteGames.map( game => (
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
