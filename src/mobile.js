import main from './styles/mobile.styl';

import 'babel-polyfill';

import detectSupport from './modules/detectSupport';
import LazyLoad from './modules/LazyLoad';


document.addEventListener('DOMContentLoaded', () => {
	
	if (!detectSupport('grid')) {
		const root = document.getElementsByTagName('html')[0];
		root.className = 'no-grid';
	};

	const lazyLoad = new LazyLoad('gallery__item');
	
});