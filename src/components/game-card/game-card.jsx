import React from "react";
import cls from './game-card.module.scss';
import {$localStorage, setToLocalStorage} from "../../store/store";
import {useStore} from "effector-react";

function GameCard({ id, inFavorite, inTop, imageSrc, name }) {
	const ls = useStore($localStorage);
	// let localArr;
	const addToStorage = (id) => {
		const localArr = [...ls, id];
		setToLocalStorage(localArr)
	};

	const removeFromStorage = (currentId) => {
		const localArr = [...ls].filter( id => id !== currentId );
		setToLocalStorage(localArr)
	};


	return (
		<article className={` ${cls['game-card']} ${ inTop ? cls['game-card--top'] : '' } `}>
			<div className={cls['game-card__cover']}>
				<img className={cls['game-card__image']} src={imageSrc} alt={`Изображение игры ${name}`}/>
			</div>
			<h3 className={cls['game-card__title']}>{name}</h3>
			{
				inFavorite ?
				<button className={`${cls['game-card__button']} ${cls['game-card__button--in']}`} onClick={() => removeFromStorage(id)}>Remove</button>
				:
				<button className={cls['game-card__button']} onClick={() => addToStorage(id)}>Add</button>
			}
		</article>
	)
}

export default GameCard
