/*
	  -----------
	|   RATING   |
	  -----------

	* Basic Attributes:
		* data-rating - rating wrapper, attribute value from 1 to 5
		* data-rating-item - rating element (icon), attribute value from 1 to 5
		* data-radio-input - rating input
*/

export default function rating(containerEl) {
	/*
		@param  {Element} containerEl - HTML элемент контейнера, по умолчанию document
	*/

	let ratingItems;

	if (containerEl) {
		if (containerEl instanceof Node) {
			ratingItems = containerEl.querySelectorAll('[data-rating]');
		}
	} else {
		ratingItems = document.querySelectorAll('[data-rating]');
	}

	if (ratingItems.length) {
        const init = (ratingEl) => {
            const inputEl = ratingEl.querySelector('[data-rating-input]');
            const iconsItems = ratingEl.querySelectorAll('[data-rating-item]');

            ratingEl.setAttribute('data-rating-init', '');

            iconsItems.forEach((iconItem) => {
                iconItem.addEventListener('click', () => {
                    const ratingValue = iconItem.getAttribute('data-rating-item');

                    if (ratingValue) {
                        if (inputEl) {
                            inputEl.value = ratingValue;
                        }

                        ratingEl.setAttribute('data-rating', ratingValue);
                    }
                });

                iconItem.addEventListener('mouseenter', () => {
                    const ratingValue = iconItem.getAttribute('data-rating-item');

                    if (ratingValue) {
                        ratingEl.setAttribute('data-rating-hover', ratingValue);
                    }
                });

                iconItem.addEventListener('mouseleave', () => {
                    ratingEl.removeAttribute('data-rating-hover');
                });

                iconItem.addEventListener('mouseleave', () => {
                    ratingEl.classList.remove('is-hover');
                });
            });
        };

        ratingItems.forEach((ratingItem) => {
            if (!ratingItem.hasAttribute('data-rating-init')) {
                init(ratingItem);
            }
        });
    }
}
