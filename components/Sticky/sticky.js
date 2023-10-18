/*
	  ----------
	|   STICKY   |
	  ----------
	* Basic Features:
		* .js-sticky - sticky element
		* .js-sticky-container - sticky block container
		* .js-sticky-block - sticky block
			** data-sticky-offset - offset from the top of the browser window
			** data-sticky-is-header - whether to consider a fixed header

*/

/**
    * @param  {Element} stickyContainer - HTML container element, document by default
*/
export default function setSticky(stickyContainer) {
	let stickyElements;

	if (stickyContainer) {
		if (stickyContainer instanceof Node) {
			stickyElements = stickyContainer.querySelectorAll('.js-sticky');
		}
	} else {
		stickyElements = document.querySelectorAll('.js-sticky');
	}

    if (stickyElements.length) {
        let lastScrollTop = [];

        const displaySticky = (stickyEl, index) => {
            const windowScrollTop = Math.round(window.scrollY);
            let scrollTop = windowScrollTop;

            const stickyBlock = stickyEl.querySelector('.js-sticky-block');
            const stickyContainer = stickyEl.querySelector('.js-sticky-container');

            if (stickyContainer && stickyBlock) {
                const header = document.querySelector('.js-header.is-fixed .header__inner') || null;
                const stickyHeight = stickyBlock.offsetHeight;
                const containerOffsetTop = Math.floor(stickyContainer.getBoundingClientRect().top) + scrollTop;
                const stickyOffsetTop = Math.floor(stickyBlock.getBoundingClientRect().top) + scrollTop;
                const stickyOffsetDiff = stickyOffsetTop - containerOffsetTop;
                const containerWidth = stickyContainer.offsetWidth;
                const offsetFixed = Number(stickyBlock.getAttribute('data-sticky-offset')) || 30;

                stickyContainer.style = null;

                const containerHeight = stickyContainer.offsetHeight;

                if (stickyHeight >= containerHeight) {
                    stickyBlock.style = null;
                    stickyBlock.classList.remove('is-fixed', 'is-bottom');
                } else {
                    stickyContainer.style.height = `${containerHeight}px`;

                    if (header) {
                        scrollTop += header.offsetHeight;
                    }

                    if (scrollTop + offsetFixed >= containerOffsetTop ) {
                        stickyBlock.style.width = `${containerWidth}px`;

                        if (stickyHeight > (window.innerHeight - offsetFixed * 2)) {

                            if (windowScrollTop >= lastScrollTop[index]) {
                                if ((scrollTop + window.innerHeight) >= (stickyOffsetTop + stickyHeight + offsetFixed)) {
                                    stickyBlock.classList.add('is-fixed');
                                    stickyBlock.style.setProperty('--sticky-fixed-bottom', `${offsetFixed}px`);
                                    stickyBlock.style.removeProperty('margin-top');
                                } else {
                                    stickyBlock.classList.remove('is-fixed');
                                    stickyBlock.style.marginTop = `${stickyOffsetDiff}px`;
                                    stickyBlock.style.removeProperty('--sticky-fixed-top');
                                }
                            } else {
                                stickyBlock.style.removeProperty('--sticky-fixed-bottom');

                                if (scrollTop + offsetFixed <= stickyOffsetTop) {
                                    stickyBlock.classList.add('is-fixed');
                                    stickyBlock.style.marginTop = null;
                                    stickyBlock.style.setProperty('--sticky-fixed-top', `${offsetFixed}px`);
                                } else {
                                    stickyBlock.classList.remove('is-fixed');
                                    stickyBlock.style.marginTop = `${stickyOffsetDiff}px`;
                                }
                            }

                            if ((scrollTop - offsetFixed) >= (containerOffsetTop - window.innerHeight + containerHeight)) {
                                stickyBlock.classList.remove('is-fixed');
                                stickyBlock.style.removeProperty('--sticky-fixed-top');
                                stickyBlock.style.removeProperty('--sticky-fixed-bottom');

                                if (!stickyBlock.classList.contains('is-bottom')) {
                                    stickyBlock.classList.add('is-bottom');
                                    stickyBlock.style.marginTop = `${stickyOffsetDiff}px`;
                                }
                            } else {
                                stickyBlock.classList.remove('is-bottom');
                            }
                        } else {
                            stickyBlock.classList.add('is-fixed');
                            stickyBlock.style.setProperty('--sticky-fixed-top', `${offsetFixed}px`);

                            if ((scrollTop + offsetFixed) >= (containerOffsetTop + containerHeight - stickyHeight)) {
                                stickyBlock.classList.add('is-bottom');
                                stickyBlock.classList.remove('is-fixed');

                                stickyBlock.style.removeProperty('margin-top');
                                stickyBlock.style.removeProperty('--sticky-fixed-top');
                            } else {
                                stickyBlock.classList.remove('is-bottom');
                            }
                        }
                    } else {
                        stickyBlock.classList.remove('is-fixed');
                        stickyBlock.style.removeProperty('--sticky-fixed-top');
                        stickyBlock.style.removeProperty('--sticky-fixed-bottom');
                        stickyBlock.style.width = null;
                    }
                }
            }

            lastScrollTop[index] = windowScrollTop;
        };

        stickyElements.forEach((stickyEl, index) => {
            lastScrollTop[index] = 0;

            displaySticky(stickyEl, index);

            window.addEventListener('scroll', () => {
                displaySticky(stickyEl, index);
            });

            window.addEventListener('resize', () => {
                displaySticky(stickyEl, index);
            });
        });
    }
}
