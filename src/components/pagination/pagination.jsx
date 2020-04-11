import React from "react";
import cls from './pagination.module.scss';

function Pagination() {
	const pages = [1,2,3,4,5,6];

	return (
		<div className={cls['pagination']}>
			<ul className={cls['pagination__list']}>
				<li className={cls['pagination__item']}>
					<button className={`${cls['pagination__button']} ${cls['pagination__button--prev']}`}>Назад</button>
				</li>
				{pages.map( pageNumber => (
					<li className={cls['pagination__item']} key={pageNumber}>
						<button className={cls['pagination__button']}>{pageNumber}</button>
					</li>
				))}
				<li className={cls['pagination__item']}>
					<button className={`${cls['pagination__button']} ${cls['pagination__button--next']}`}>Вперед</button>
				</li>
			</ul>
		</div>
	)
}

export default Pagination
