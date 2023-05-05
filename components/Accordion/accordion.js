/*
	  ------------- 
	|   ACCORDION   |
	  ------------- 

	* Basic Attributes:
		* data-accordions - general wrapper for accordions
		* data-accordion - accordion block
			** If it is necessary to close neighboring accordions, then specify the data-accordion-one attribute
			** If you want to always display the active accordion (without the possibility of closing), then specify the data-accordion-visible attribute
			** If by default you want to show the accordion, then you need to specify the classes .is-active.is-visible
		* data-accordion-button - open/close dropdown content button
		* data-accordion-content - drop-down content
*/

export default function accordion(accordionsContainer, duration = 300) {
	/* 
		@param  {Element} accordionsContainer - HTML container element, default document
		@param  {number} duration - accordion opening time (also needs to be changed in CSS)
	*/

	let accordions;

	if (accordionsContainer) {
		if (accordionsContainer instanceof Node) {
			accordions = accordionsContainer.querySelectorAll('[data-accordion]');
		}
	} else {
		accordions = document.querySelectorAll('[data-accordion]');
	}

	if (!accordions) return;

	accordions.forEach(accordion => {
		if (!accordion.hasAttribute('data-accordion-init')) {
			accordionInit();
		}

		function accordionInit () {
			const accordionButton = accordion.querySelector('[data-accordion-button]');
			const accordionContent = accordion.querySelector('[data-accordion-content]');
			let isOpen = true;
			
			accordion.setAttribute('data-accordion-init', '');

			if (accordionButton && accordionContent) {
				if (accordion.classList.contains('is-active')) {
					accordionContent.style.maxHeight = `${accordionContent.scrollHeight}px`;
				}

				accordionButton.addEventListener('click', (event) => {
					let isVisible = accordion.hasAttribute('data-accordion-visible');

					if (isOpen) {
						if (isVisible) {
							if (!accordion.classList.contains('is-active')) {
								accordionItem ();
							}
						} else {
							accordionItem ();
						}
					}

					function accordionItem () {
						isOpen = false;

						if (accordion.hasAttribute('data-accordion-one')) {
							const accordionActive = accordion.closest('[data-accordions]').querySelector('[data-accordion].is-active');
		
							if (accordionActive && accordionActive !== accordion) {
								const accordionActiveContent = accordionActive.querySelector('[data-accordion-content]');

								accordionActive.classList.remove('is-active', 'is-visible');

								if (accordionActiveContent.style.maxHeight) {
									accordionActiveContent.style.maxHeight = null;
								}
							}
						}
		
						accordion.classList.toggle('is-active');

						if (accordion.classList.contains('is-active')) {
							setTimeout(() => {
								accordion.classList.add('is-visible');
							}, duration);
						} else {
							accordion.classList.remove('is-visible');
						}
		
						if (accordionContent.style.maxHeight) {
							accordionContent.style.maxHeight = `${accordionContent.scrollHeight}px`;
							accordionContent.style.maxHeight = null;
						} else {
							accordionContent.style.maxHeight = `${accordionContent.scrollHeight}px`;
						}

						setTimeout(() => {
							isOpen = true;
						}, duration);
					}
				});
			}
		}
	});
}
