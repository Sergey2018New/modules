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

/**
	* @param  {Element} dropdownContainer - HTML container element, default document
*/
export default function dropdown(dropdownContainer) {

	let dropdowns;

	if (dropdownContainer) {
		if (dropdownContainer instanceof Node) {
			dropdowns = dropdownContainer.querySelectorAll('[data-dropdown]');
		}
	} else {
		dropdowns = document.querySelectorAll('[data-dropdown]');
	}

	if (dropdowns.length) {
		const calcMarginLeft = () => {
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

		const dropdownOpen = (target) => {
			let dropdown;
			let dropdownButton;
			let dropdownInput;

			if (target.closest('[data-dropdown-button]') || target.hasAttribute('data-dropdown-button')) {
				dropdown = target.closest('[data-dropdown]');
			}

			if (dropdown) {
				dropdownButton = dropdown.querySelector('[data-dropdown-button]');
				dropdownInput = dropdown.querySelector('[data-dropdown-input]');

				if (dropdownButton) {
					const dropdownActive = document.querySelector('[data-dropdown].is-active');

					if (dropdownActive && dropdownActive !== dropdown) {
						dropdownActive.classList.remove('is-active');
						dropdown.classList.add('is-active');
					} else {
						dropdown.classList.toggle('is-active');
					}

					if (dropdown.classList.contains('is-active')) {
						if (dropdownInput && dropdownInput.hasAttribute('data-datepicker-input')) {
							dropdownInput.focus();
						}
					}

					calcMarginLeft();
				}
			}
		}

		const closeDropdownActive = (target) => {
			const dropdownActive = document.querySelector('[data-dropdown].is-active');

			if (dropdownActive && (!target || target !== dropdownActive && !target.closest('[data-dropdown]')
			)) {
				dropdownActive.classList.remove('is-active');
			}
		}

		const changeDropdown = (dropdownItem, dropdownListItem, dropdownInput, eventChange) => {
			const dropdownListItemSelected = dropdownItem.querySelector('[data-dropdown-item].is-selected');
			const buttonTextEl = dropdownItem.querySelector('[data-dropdown-button-text]');
			const value = dropdownListItem.getAttribute('data-value');
			const valueText = dropdownListItem.textContent;

			if (dropdownListItemSelected) {
				dropdownListItemSelected.classList.remove('is-selected');
			}

			dropdownListItem.classList.add('is-selected');
			dropdownItem.classList.remove('is-active');
			dropdownItem.classList.remove('is-placeholder');

			if (buttonTextEl) {
				buttonTextEl.textContent = valueText ? valueText : value ? value : '';
			}

			if (dropdownInput) {
				dropdownInput.value = value;
				dropdownInput.classList.remove('is-error');

				if (eventChange) {
					dropdownInput.dispatchEvent(eventChange);
				}
			}
		}

		const dropdownInit = (dropdownItem) => {
			const dropdownSelectItems = dropdownItem.querySelectorAll('[data-dropdown-item]');
			const dropdownInput = dropdownItem.querySelector('[data-dropdown-input]');
			const eventChange = new Event('change');

			dropdownItem.setAttribute('data-dropdown-init', '');

			dropdownSelectItems.forEach(item => {
				item.addEventListener('click', () => {
					changeDropdown(dropdownItem, item, dropdownInput, eventChange);
				});
			});

			if (dropdownInput) {
				dropdownInput.addEventListener('change', (event) => {

					const dropdownItemCurrent = dropdownItem.querySelector(`[data-dropdown-item][data-value="${event.target.value}"]`);

					if (dropdownItemCurrent) {
						console.log(dropdownItemCurrent)
						changeDropdown(dropdownItem, dropdownItemCurrent, dropdownInput);
					}
				});
			}
		}

        dropdowns.forEach((dropdownItem) => {
            if (!dropdownItem.hasAttribute('data-dropdown-init')) {
                dropdownInit(dropdownItem);
            }
        });

        document.documentElement.addEventListener('click', (event) => {
            const target = event.target;

            closeDropdownActive(target);
            dropdownOpen(target);
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
    }
}
