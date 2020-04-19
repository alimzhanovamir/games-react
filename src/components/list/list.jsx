import React from "react";
import cls from './list.module.scss';
import GameCard from "../game-card/game-card";
import {useStore} from "effector-react";
import {$filterGames} from "../../store/store";
import img from '../../assets/images/nofound.png'

function List() {
	const gamesList = useStore($filterGames);
	// console.log(gamesList);

	if ( gamesList.length ) {
		return (
			<ul className={cls['list']}>
				{ gamesList.map( game => (
					<li className={cls['list__item']} key={game.ID}>
						<GameCard
							imageSrc={game.ImageFullPath}
							name={game.Name.en}/>
					</li>
					)
				) }
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
