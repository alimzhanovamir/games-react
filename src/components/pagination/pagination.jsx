import React from "react";
import cls from './pagination.module.scss';
import {useStore} from "effector-react";
import {$numberOfPages, $paginationCount, setNumberOfPages} from "../../store/store";

function Pagination() {
	const pages = useStore($paginationCount);
	let numberOfPages = useStore($numberOfPages);

	// console.log('Количество страниц = '+pages.length);
	// console.log('Текущая страница = '+numberOfPages);

	if ( pages.length ) {
		return (
			<div className={cls['pagination']}>
				<ul className={cls['pagination__list']}>
					<li className={cls['pagination__item']}>
						<button className={`${cls['pagination__button']} ${cls['pagination__button--prev']}`} onClick={() => setNumberOfPages(--numberOfPages)} disabled={numberOfPages === 1 ? true : false}>Назад</button>
					</li>
					{pages.map( page => (
						<li className={cls['pagination__item']} key={page}>
							<button className={` ${cls['pagination__button']}  ${ page === numberOfPages ? cls['pagination__button--active'] : null } `} onClick={() => setNumberOfPages(page)}>{page}</button>
						</li>
					))}
					<li className={cls['pagination__item']}>
						<button className={`${cls['pagination__button']} ${cls['pagination__button--next']}`} onClick={() => setNumberOfPages(++numberOfPages)} disabled={numberOfPages === pages.length ? true : false}>Вперед</button>
					</li>
				</ul>
			</div>
		)
	}
	return null
}

export default Pagination
