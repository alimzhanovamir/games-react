import React from "react";
import cls from './game-card.module.scss';

function GameCard({ imageSrc, name, modClass }) {
	return (
		<article className={` ${cls['game-card']} ${ modClass ? cls['game-card--top'] : null }`}>
			<div className={cls['game-card__cover']}>
				<img className={cls['game-card__image']} src={imageSrc} alt={`Изображение игры ${name}`}/>
			</div>
			<h3 className={cls['game-card__title']}>{name}</h3>
			<button className={cls['game-card__button']}>В избранное</button>
		</article>
	)
}

export default GameCard
