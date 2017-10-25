import main from './styles/main.styl';
import imagesLoaded from 'imagesloaded';


document.addEventListener('DOMContentLoaded', () => {
	
	const galleryItems = document.getElementsByClassName('gallery__item');

	
	[...galleryItems].map(item => {
		imagesLoaded(
			item,
			{ background: true },
			() => {
				item.classList.add('loaded');
			});
	});
	
});