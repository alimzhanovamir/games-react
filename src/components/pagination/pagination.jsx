import React from "react";
import cls from './pagination.module.scss';
import {useStore} from "effector-react";
import {$numberOfPages, $paginationCount, setNumberOfPages} from "../../store/store";

function Pagination() {
	const pages = useStore($paginationCount);
	let numberOfPages = useStore($numberOfPages);

	// console.log('Количество страниц = '+pages.length);
	// console.log('Текущая страница = '+numberOfPages);

	function pagination(c, m) {
		var current = c,
			last = m,
			delta = 2,
			left = current - delta,
			right = current + delta + 1,
			range = [],
			rangeWithDots = [],
			l;

		for (let i = 1; i <= last; i++) {
			if (i == 1 || i == last || i >= left && i < right) {
				range.push(i);
			}
		}

		for (let i of range) {
			if (l) {
				if (i - l === 2) {
					rangeWithDots.push(l + 1);
				} else if (i - l !== 1) {
					rangeWithDots.push('...');
				}
			}
			rangeWithDots.push(i);
			l = i;
		}

		return rangeWithDots;
	}
	const arr = pagination(numberOfPages, pages.length)

	if ( pages.length ) {
		return (
			<div className={cls['pagination']}>
				<ul className={cls['pagination__list']}>
					<li className={cls['pagination__item']}>
						<button
							className={`${cls['pagination__button']} ${cls['pagination__button--prev']}`}
							onClick={() => setNumberOfPages(--numberOfPages)}
							disabled={numberOfPages === 1 ? true : false}>Назад</button>
					</li>
					{arr.map( (page, index) => {
						console.log(page)
						return(
						<li className={cls['pagination__item']} key={index}>
							<button
								className={` ${cls['pagination__button']}  ${ page === numberOfPages ? cls['pagination__button--active'] : null } `}
								onClick={() => setNumberOfPages(page)}
								disabled={page === numberOfPages ? true : false}>{page}</button>
						</li>
					)})}
					<li className={cls['pagination__item']}>
						<button
							className={`${cls['pagination__button']} ${cls['pagination__button--next']}`}
							onClick={() => setNumberOfPages(++numberOfPages)}
							disabled={numberOfPages === pages.length ? true : false}>Вперед</button>
					</li>
				</ul>
			</div>
		)
	}
	return null
}

export default Pagination
