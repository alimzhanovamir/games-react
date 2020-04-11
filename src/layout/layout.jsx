import React from "react";
import cls from './layout.module.scss';
import List from "../components/list/list";
import Header from "../components/header/header";
import Pagination from "../components/pagination/pagination";

function Layout({state, favoriteGames}) {

	if ( state ) {
		return (
			<div className={cls['layout']}>
				<Header/>
				<main className={cls['main']}>
					<h2>Все игры</h2>
					<Pagination/>
					<List games={state.slice(0,100)} favoriteGames={favoriteGames}/>
					<Pagination/>
				</main>
			</div>
		);
	}
	else {
		return <div className={cls['loader']}>Loading...</div>
	}
}

export default Layout
