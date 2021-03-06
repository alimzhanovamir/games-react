import React from "react";
import { useMediaQuery } from 'react-responsive';
import cls from './pagination.module.scss';
import {useStore} from "effector-react";
import {$numberOfPages, $paginationCount, setNumberOfPages} from "../../store/store";

function Pagination() {
	const desktop = useMediaQuery({ query: '(min-width: 768px)' });
	const mobile = useMediaQuery({ query: '(max-width: 767px)' });
	const pages = useStore($paginationCount);
	let numberOfPages = useStore($numberOfPages);

	// console.log('Количество страниц = '+pages.length);
	// console.log('Текущая страница = '+numberOfPages);
	let pagesArray;
	if ( desktop ) {
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

		pagesArray = pagination(numberOfPages, pages.length);
	}

	if ( desktop && pages.length > 1 ) {
		return (
			<div className={cls['pagination']}>
				<ul className={cls['pagination__list']}>
					<li className={cls['pagination__item']}>
						<button
							className={`${cls['pagination__button']} ${cls['pagination__button--prev']}`}
							onClick={() => setNumberOfPages(--numberOfPages)}
							disabled={numberOfPages === 1 ? true : false}>Назад</button>
					</li>
					{
						pagesArray.map( (page, index) => {
							return(
								<li className={cls['pagination__item']} key={index}>
									<button
										className={` ${cls['pagination__button']}  ${ page === numberOfPages ? cls['pagination__button--active'] : '' } `}
										onClick={() => setNumberOfPages(page)}
										disabled={page === numberOfPages || typeof page !== 'number' ? true : false}>{page}</button>
								</li>
							)}
						)
					}
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

	if ( mobile && pages.length > 1) {
		return (<div className={cls['mobile-pagination']}>
			<button className={cls['mobile-pagination__button']}
							onClick={() => setNumberOfPages(--numberOfPages)}
							disabled={ numberOfPages === 1 ? true : false}>&#xab;</button>
			<p className={cls['mobile-pagination__count']}>{`${numberOfPages}/${pages.length}`}</p>
			<button className={cls['mobile-pagination__button']}
							onClick={() => setNumberOfPages(++numberOfPages)}
							disabled={ numberOfPages === pages.length ? true : false}>&#xbb;</button>
		</div>)
	}
	return null
}

export default Pagination
