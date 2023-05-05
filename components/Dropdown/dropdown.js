/*
	  ------------- 
	|   DROPDOWN   |
	  -------------

	* Basic Attributes:
		* data-dropdown - dropdown menu wrapper
		* data-dropdown-button - popup open/close button
		* data-dropdown-button-text - button text for opening/closing the popup window
		* data-dropdown-popup - pop-up window
		* data-dropdown-item - select list element
		* data-dropdown-input - Input when selected from dropdown list
*/

export default function dropdown(dropdownContainer) {
	/* 
		@param  {Element} dropdownContainer - HTML container element, default document
	*/

	let dropdowns;

	if (dropdownContainer) {
		if (dropdownContainer instanceof Node) {
			dropdowns = dropdownContainer.querySelectorAll('[data-dropdown]');
		}
	} else {
		dropdowns = document.querySelectorAll('[data-dropdown]');
	}
 
	if (!dropdowns) return;

	dropdowns.forEach(dropdownItem => {
		if (!dropdownItem.hasAttribute('data-dropdown-init')) {
			dropdownInit(dropdownItem);
		}
	});

	function dropdownInit (dropdownItem) {
		const dropdownButton = dropdownItem.querySelector('[data-dropdown-button]');
		const dropdownSelectItems = dropdownItem.querySelectorAll('[data-dropdown-item]');
		const dropdownInput = dropdownItem.querySelector('[data-dropdown-input]');
		const buttonTextEl = dropdownItem.querySelector('[data-dropdown-button-text]');

		dropdownItem.setAttribute('data-dropdown-init', '');

		if (dropdownButton) {
			dropdownButton.addEventListener('click', (event) => {
				const dropdownActive = document.querySelector('[data-dropdown].is-active');

				if (dropdownActive && dropdownActive !== dropdownItem) {
					dropdownActive.classList.remove('is-active');
					dropdownItem.classList.add('is-active');
				} else {
					dropdownItem.classList.toggle('is-active');
				}

				if (dropdownItem.classList.contains('is-active')) {
					if (dropdownInput && dropdownInput.hasAttribute('data-datepicker')) {
						dropdownInput.focus();
					}
				}

				calcMarginLeft();
			});
		}

		dropdownSelectItems.forEach(item => {
			item.addEventListener('click', () => {
				
				const value = item.getAttribute('data-value');
				const valueLang = item.getAttribute('data-value-lang');

				for (var i = 0; i < dropdownSelectItems.length; i++) {
					dropdownSelectItems[i].classList.remove('is-selected');
				}

				item.classList.add('is-selected');
				dropdownItem.classList.remove('is-active');
				dropdownItem.classList.remove('is-placeholder');

				if (buttonTextEl) {
					buttonTextEl.textContent = value || '';
				}

				if (dropdownInput) {
					dropdownInput.value = value;
					dropdownInput.classList.remove('is-error');
				}
			});
		});

		if (dropdownInput) {
			dropdownInput.addEventListener( 'changeDate', ( event ) => {
				if (buttonTextEl) {
					buttonTextEl.textContent = event.target.value || '';
				}
				closeDropdownActive();
			} );
		}
	}

	document.addEventListener('click', (event) => {
		closeDropdownActive(event.target)
	});
	
	document.addEventListener('keydown', (e) => {
		if (
			document.activeElement.closest('[data-dropdown].is-active') 
			&& !document.activeElement.closest('.datepicker') && !document.activeElement.classList.contains('datepicker') 
			&& (e.key === 'Escape' || e.code === 'Escape')) {

			closeDropdownActive();
			return;
		} 
	});

	window.addEventListener('resize', (e) => {
		calcMarginLeft();
	});


	function closeDropdownActive(target) {
		const dropdownActive = document.querySelector('[data-dropdown].is-active');

		if (dropdownActive && !target || (dropdownActive && target !== dropdownActive && !target.closest('[data-dropdown]'))) {
			dropdownActive.classList.remove('is-active');
		}
	}

	function calcMarginLeft() {
		const dropdownActive = document.querySelector('[data-dropdown].is-active');

		if (dropdownActive) {
			const dropdownActiveContent = dropdownActive.querySelector('[data-dropdown-popup]');

			if (dropdownActiveContent) {
				dropdownActiveContent.style.removeProperty('margin-left');

				const getBoundingClientRect = dropdownActiveContent.getBoundingClientRect();
				const offsetLeft = getBoundingClientRect.x;
				const width = getBoundingClientRect.width;

				if ((offsetLeft + width + 10) > window.innerWidth) {
					dropdownActiveContent.style.marginLeft = (offsetLeft + width + 10 - window.innerWidth) * (-1) + 'px';
				} else {
					dropdownActiveContent.style.removeProperty('margin-left');
				}
			}
		}
	}
}
