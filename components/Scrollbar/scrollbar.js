// Scrollbar
import SimpleBar from 'simplebar';
/*
	SimpleBar
	https://github.com/Grsmto/simplebar
*/

/* 
	@param  {Element} scrollbarSelectors - HTML scrollbar elements
*/
export default function scrollbar(scrollbarSelectors) {
	let scrollbars;
	
	if (scrollbarSelectors && typeof scrollbarSelectors === 'object' && scrollbarSelectors.length > 0) {
		scrollbars = scrollbarSelectors;
	} else {
		scrollbars = document.querySelectorAll('[data-scrollbar]');
	}
 
	if (scrollbars.length) {
		scrollbars.forEach((item) => {
			const simpleBar = new SimpleBar(item, {
				autoHide: false
			});
			let simpleBarWrapper;
			let simpleBarContent;
			let heightContent;
			let scrollTop;
			
			simpleBar.getScrollElement().addEventListener('scroll', (event) => {
				simpleBarWrapper = event.srcElement;
				simpleBarContent = simpleBarWrapper.querySelector('.simplebar-content');
				heightContent = simpleBarContent.offsetHeight;
				scrollTop = simpleBarWrapper.scrollTop;

				// if ((simpleBarWrapper.offsetHeight + scrollTop + 15) >= heightContent) {
				// 	event.path[4].setAttribute('data-simplebar-scrolled', '');
				// } else {
				// 	event.path[4].removeAttribute('data-simplebar-scrolled');
				// }
			});
		});
	}
}