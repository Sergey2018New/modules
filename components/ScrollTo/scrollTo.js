import {gotoBlock} from './gotoblock.js';

/* Scroll to element */

export default function scrollTo() {
	const goToItems = document.querySelectorAll('.js-scroll-to');

    if (goToItems.length) {
        for (let i = 0; i < goToItems.length; i++) {
            const goToItem = goToItems[i];
            
            goToItem.addEventListener('click', () => {
                const selector = goToItem.getAttribute('href') || goToItem.getAttribute('data-goto');

                if (selector) {
                    gotoBlock(selector, true, 800, -50, '.header.is-fixed .header__inner');
                } 
            });
        }
    }
}
