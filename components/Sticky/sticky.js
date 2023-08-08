/*
	  ----------
	|   STICKY   |
	  ----------
	* Basic Features:
		* data-sticky-container - sticky block container
		* data-sticky - sticky block
			** data-sticky-offset - offset from the top of the browser window
			** data-sticky-is-header - whether to consider a fixed header

*/

/**
    * @param  {Element} stickyContainer - HTML container element, document by default
*/
export default function sticky(stickyContainer) {
	let stickyElements;

	if (stickyContainer) {
		if (stickyContainer instanceof Node) {
			stickyElements = stickyContainer.querySelectorAll('[data-sticky]');
		}
	} else {
		stickyElements = document.querySelectorAll('[data-sticky]');
	}

    if (stickyElements.length) {
        const stickyInit = (stickyBlock) => {
            let scrollTop = window.scrollY;
            const container = stickyBlock.closest('[data-sticky-container]');

            if (container) {
                const stickyHeight = stickyBlock.offsetHeight;
                const offsetTop = container.getBoundingClientRect().top + scrollTop;
                const containerWidth = container.offsetWidth;
                const containerHeight = container.offsetHeight;

                container.style.height = null;

                if (stickyHeight >= containerHeight) {
                    container.style.height = null;
                    stickyBlock.style.width = null;
                    stickyBlock.classList.remove('is-fixed', 'is-bottom');
                    return;
                } else {
                    container.style.height = container.offsetHeight + 'px';
                }

                if (stickyBlock.hasAttribute('data-sticky-is-header')) {
                    const header = document.querySelector('.header.is-fixed .header__inner');

                    if (header) {
                        scrollTop += header.offsetHeight;
                    }
                }

                if (stickyBlock.hasAttribute('data-sticky-offset')) {
                    scrollTop += Number(stickyBlock.getAttribute('data-sticky-offset'));
                }

                if ((scrollTop) >= offsetTop) {
                    stickyBlock.classList.add('is-fixed');
                    stickyBlock.style.width = `${containerWidth}px`;
                } else {
                    stickyBlock.classList.remove('is-fixed');
                    stickyBlock.style.width = null;
                }

                if ((scrollTop) >= (offsetTop + containerHeight - stickyBlock.offsetHeight)) {
                    stickyBlock.classList.add('is-bottom');

                    if (stickyBlock.classList.contains('is-fixed')) {
                        stickyBlock.classList.remove('is-fixed');
                        stickyBlock.style.width = null;
                    }
                } else {
                    stickyBlock.classList.remove('is-bottom');
                }
            }
        }

        stickyElements.forEach((stickyBlock) => {
            stickyInit(stickyBlock);

            window.addEventListener('scroll', () => {
                stickyInit(stickyBlock);
            });

            window.addEventListener('resize', () => {
                stickyInit(stickyBlock);
            });
        });
    }
}
