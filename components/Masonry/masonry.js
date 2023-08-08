import Masonry from 'masonry-layout';

export default function masonry() {
	/*
		masonry
		https://github.com/desandro/masonry
	*/
 
	const grids = document.querySelectorAll('[data-masonry]');

	if (grids.length) {
		grids.forEach((item) => {
			new Masonry(item, {
				columnWidth: 200,
				itemSelector: '[data-masonry-item]',
			});
		});
	}
}