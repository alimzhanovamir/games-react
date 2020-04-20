import React from "react";
import cls from './list.module.scss';
import GameCard from "../game-card/game-card";
import {useStore} from "effector-react";
import {$filterGames, $localStorage, $topGamesIDs} from "../../store/store";
import img from '../../assets/images/nofound.png'

function List() {
	const gamesList = useStore($filterGames);
	const topGamesIDs = useStore($topGamesIDs);
	const localArray = useStore($localStorage);

	if ( gamesList.length ) {
		return (
			<ul className={cls['list']}>
				{ gamesList.map( game => {
					let inFavorite = localArray.some( id => id == game.ID );
					let inTop = topGamesIDs.some( id => id == game.ID );
					return (
						<li className={cls['list__item']} key={game.ID}>
							<GameCard
								id={game.ID}
								inFavorite={inFavorite}
								inTop={inTop}
								imageSrc={game.ImageFullPath}
								name={game.Name.en}/>
						</li>
						)
					}
				)}
			</ul>
		)
	}
	return (
		<div className={cls['list-empty']}>
			<div className={cls['list-empty__inner']}>
				<img className={cls['list-empty__image']} src={img} alt=""/>
				<p className={cls['list-empty__text']}>Sorry, no games</p>
			</div>
		</div>
	)
}

export default List
