/*
	  --------
	|   TABS   |
	  --------

	* Basic Attributes:
		* data-tabs - general wrapper for tabs
		* data-tabs-menu - tab menu
		* data-tabs-item - menu item
			** The attribute value must be unique inside the data-tabs wrapper
			** Additionally, you can specify the data-value attribute with the value of the tab name
				(required to change the text of the button that opens the menu list)
		* data-tabs-pane - drop-down panel
			** The value of the attribute must match the value of the data-tabs-item attribute

	* Additional attributes:
		* data-tabs-list - list of menu items
		* data-tabs-overlay - dynamic bar for menu items
		* data-tabs-prev - back tab navigation
		* data-tabs-next - forward tab navigation
		* data-tabs-button - button that opens the menu list (for adaptive)
		* data-tabs-button-text - the text of the button that opens the menu list (for adaptive)
			** The attribute value is substituted from the active menu item from the data-value attribute

	* Functional attributes (can be specified on any HTML element):
		* data-tabs-switch - adds an HTML element the ability to switch given tabs
			** The value of the attribute must match the value of the data-tabs attribute
		* data-tabs-switch-pane - an attribute that specifies a specific tab from the data-tabs-pane attribute
*/

/**
    * @param  {Element} tabsContainer - HTML container element, default document
*/
export default function tabs(tabsContainer) {
	let tabsElements;

	if (tabsContainer) {
		if (tabsContainer instanceof Node) {
			tabsElements = tabsContainer.querySelectorAll('[data-tabs]');
		}
	} else {
		tabsElements = document.querySelectorAll('[data-tabs]');
	}

    if (tabsElements.length) {
        /**
            * Change back overlay
            * @param  {Element} tabsCurrent - HTML element of tabs
            * @param  {Element} tabsOverlay - HTML overlay element
        */
        const changeOverlay = (tabsCurrent, tabsOverlay) => {
            setTimeout(() => {
                const tabActive = tabsCurrent.querySelector('[data-tabs-item].is-active');

                if (tabsOverlay && tabActive) {
                    tabsOverlay.style.width = `${tabActive.offsetWidth}px`;
                    tabsOverlay.style.left = `${tabActive.offsetLeft}px`;
                }
            }, 10);
        };

        /**
            * Change tab
            * @param  {Element} tabs - HTML element of tabs
            * @param  {Element} tabCurrent - Tab panel HTML element
            * @param  {Element} tabsButton - Tab dropdown button HTML element
        */
        const moveTab = (tabs, tabCurrent, tabsButton) => {
            if (!tabs || !tabCurrent) return;

            const tabActive = tabs.querySelector('[data-tabs-item].is-active');

            let panelActive;
            let panelCurrent = tabs.querySelector(`[data-tabs-pane="${tabCurrent.getAttribute('data-tabs-item')}"]`);

            if (tabActive) {
                tabActive.classList.remove('is-active');
                panelActive = tabs.querySelector(`[data-tabs-pane="${tabActive.getAttribute('data-tabs-item')}"]`);
            }

            if (panelActive) {
                panelActive.classList.remove('is-active');
            }

            tabCurrent.classList.add('is-active');

            if (panelCurrent) {
                panelCurrent.classList.add('is-active');
            }

            if (tabsButton) {
                const tabsButtonText = tabsButton.querySelector('[data-tabs-button-text]');

                if (tabsButtonText) {
                    tabsButtonText.textContent = tabCurrent.getAttribute('data-value') || '';
                }
            }
        };

        /**
            * Close drop down menu of tabs
        */
        const closeTabsList =  () => {
            const tabsButtonActive = document.querySelector('[data-tabs-button].is-active');
            const tabsListActive = document.querySelector('[data-tabs-list].is-active');

            if (tabsButtonActive) {
                tabsButtonActive.classList.remove('is-active');
            }
            if (tabsListActive) {
                tabsListActive.classList.remove('is-active');
            }
        };

        /**
            * Tab navigation
            * @param  {Element} tabs - HTML element of tabs
            * @param  {Element} tabsOverlay - menu item background HTML element
            * @param  {Element} direction - Tab navigation direction
        */
        const tabNavigation = (tabs, tabsOverlay, direction) => {
            if (!tabs) return;

            let tabActive = tabs.querySelector('[data-tabs-item].is-active');
            let tabsButton = tabs.querySelector('[data-tabs-button]');

            if (tabActive) {
                let tabCurrent = tabActive.nextElementSibling;

                if (direction == 'prev') {
                    tabCurrent = tabActive.previousElementSibling;
                }

                if (tabCurrent) {
                    moveTab(tabs, tabCurrent, tabsButton);

                    if (tabsOverlay) {
                        changeOverlay (tabs, tabsOverlay);
                    }
                }
            }
        };

        /**
            * Checking and changing the disabled attribute of the tab navigation button
            * @param  {Element} tabs - HTML element of tabs
            * @param  {Element} tabNavPrev - Button to move tabs to the left
            * @param  {Element} tabNavNext - Button to move tabs to the right
        */
        const isDisabledTabNavigation = (tabs, tabNavPrev, tabNavNext) => {
            let tabActive = tabs.querySelector('[data-tabs-item].is-active');

            if (tabNavPrev) {
                if (tabActive.previousElementSibling) {
                    tabNavPrev.classList.remove('is-disabled');
                } else {
                    tabNavPrev.classList.add('is-disabled');
                }
            }

            if (tabNavNext) {
                if (tabActive.nextElementSibling) {
                    tabNavNext.classList.remove('is-disabled');
                } else {
                    tabNavNext.classList.add('is-disabled');
                }
            }
        };

        tabsElements.forEach((tabs) => {
            const tabsInit = () => {
                const tabsButton = tabs.querySelector('[data-tabs-button]');
                const tabsMenu = tabs.querySelector('[data-tabs-menu]');
                const tabsList = tabs.querySelector('[data-tabs-list]');
                const tabsItems = tabsMenu ? tabsMenu.querySelectorAll('[data-tabs-item]') : '';
                const tabsOverlay = tabs.querySelector('[data-tabs-overlay]');
                const tabsPrev = tabs.querySelector('[data-tabs-prev]');
                const tabsNext = tabs.querySelector('[data-tabs-next]');

                tabs.setAttribute('data-tabs-init', '');

                changeOverlay(tabs, tabsOverlay);
                isDisabledTabNavigation(tabs, tabsPrev, tabsNext);

                window.addEventListener('resize', () => {
                    changeOverlay(tabs, tabsOverlay);
                });

                if (tabsItems) {
                    tabsItems.forEach(tabItem => {
                        tabItem.addEventListener('click', (event) => {
                            const target = event.currentTarget;

                            moveTab(tabs, target, tabsButton);
                            changeOverlay(tabs, tabsOverlay);
                            isDisabledTabNavigation(tabs, tabsPrev, tabsNext);
                        });
                    });
                }

                if (tabsPrev) {
                    tabsPrev.addEventListener('click', (e) => {
                        e.preventDefault();

                        tabNavigation(tabs, tabsOverlay, 'prev');
                        isDisabledTabNavigation(tabs, tabsPrev, tabsNext);
                    });
                }

                if (tabsNext) {
                    tabsNext.addEventListener('click', (e) => {
                        e.preventDefault();

                        tabNavigation(tabs, tabsOverlay, 'next');
                        isDisabledTabNavigation(tabs, tabsPrev, tabsNext);
                    });
                }

                if (tabsButton) {
                    tabsButton.addEventListener('click', (e) => {
                        e.preventDefault();

                        tabsButton.classList.toggle('is-active');

                        if (tabsList) {
                            tabsList.classList.toggle('is-active');
                        }
                    });
                }
            };

            if (!tabs.hasAttribute('data-tabs-init')) {
                tabsInit();
            }
        });

        document.addEventListener('click', (event) => {
            let target = event.target;

            if (target.hasAttribute('data-tabs-switch') || target.closest('[data-tabs-switch]')) {
                event.preventDefault();

                const tabsSwitch = document.querySelector(`[data-tabs="${target.getAttribute('data-tabs-switch')}"]`);

                if (tabsSwitch) {
                    const tabsPrev = tabsSwitch.querySelector('[data-tabs-prev');
                    const tabsNext = tabsSwitch.querySelector('[data-tabs-next');
                    const tabCurrent = tabsSwitch.querySelector(`[data-tabs-item="${target.getAttribute('data-tabs-switch-pane')}"]`);
                    const tabsOverlay = tabsSwitch.querySelector('[data-tabs-overlay]');
                    const tabsButton = tabsSwitch.querySelector('[data-tabs-button]');

                    if (tabCurrent) {
                        moveTab(tabsSwitch, tabCurrent, tabsButton);
                        changeOverlay (tabsSwitch, tabsOverlay);
                        isDisabledTabNavigation(tabsSwitch, tabsPrev, tabsNext);
                    }
                }
            }

            if (!target.hasAttribute('data-tabs-button') && !target.closest('[data-tabs-button]')) {
                closeTabsList();
            }
        });
    }
}
