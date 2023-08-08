/*
     ----------------
	|  HEADER  MENU  |
	 ----------------
*/
/**
  * Header menu
  * @param  {number} widthAdaptive - browser width at which the menu
  transitions to the responsive menu
  * @param  {number} delay - menu opening time (also needs to be changed in CSS)
  * @param  {number} duration - duration of submenu opening (also needs to be changed in CSS)
*/

export default function headerMenu(widthAdaptive = 991, delay = 300, duration = 400) {
    const menu = document.querySelector('.js-menu');

    if (menu) {
        const menuBurger = menu.querySelector('.js-menu-burger');
        const menuPopup = menu.querySelector('.js-menu-popup');
        const menuBackdrop = menu.querySelector('.js-menu-backdrop');
        const menuClose = menu.querySelector('.js-menu-close');
        const menuDropdownItems = menu.querySelectorAll('.js-menu-dropdown');
        let isMenuReady = true;
        let isMenuOpen = false;
        const focusElements = [
            'a[href]',
            'area[href]',
            'input:not([disabled]):not([type="hidden"]):not([aria-hidden])',
            'select:not([disabled]):not([aria-hidden])',
            'textarea:not([disabled]):not([aria-hidden])',
            'button:not([disabled]):not([aria-hidden])',
            'iframe',
            'object',
            'embed',
            '[contenteditable]',
            '[tabindex]:not([tabindex^="-"])'
        ];
        const focusCatcher = (e, menu) => {
            // Находим все элементы на которые можно сфокусироваться
            const nodes = menu.querySelectorAll(focusElements);

            //преобразуем в массив
            const nodesArray = Array.prototype.slice.call(nodes);

            //если фокуса нет в окне, то вставляем фокус на первый элемент
            if (!menu.contains(document.activeElement)) {
                nodesArray[0].focus();
                e.preventDefault();
            } else {
                const focusedItemIndex = nodesArray.indexOf(document.activeElement);

                if (e.shiftKey && focusedItemIndex === 0) {
                    //перенос фокуса на последний элемент
                    nodesArray[nodesArray.length - 1].focus();
                    e.preventDefault();
                }

                if (!e.shiftKey && focusedItemIndex === nodesArray.length - 1) {
                    //перенос фокуса на первый элемент
                    nodesArray[0].focus();
                    e.preventDefault();
                }
            }
        };

          /**
            * Is Adaptive Menu
        */
          const isAdaptiveMenu = () => {
            return window.innerWidth <= widthAdaptive;
        };

        /**
            * Adding the body class of the opened menu and assigning the scrollbar
            width padding variable
        */
        const lockBody = () => {
            const scrollbarCompensate = `${window.innerWidth - document.body.offsetWidth}px`;
            document.documentElement.style.setProperty('--menu-scrollbar-compensate', scrollbarCompensate);
            document.body.classList.add('is-menu-active');
        };

        /**
            * Removing the open menu's body class and removing the scrollbar
            width padding variable
        */
        const unlockBody = () => {
            document.documentElement.style.removeProperty('--menu-scrollbar-compensate');
            document.body.classList.remove('is-menu-active');
        };

        /**
            * Menu opening
        */
        const openMenu = () =>  {
            if (isMenuReady) {
                isMenuReady = false;

                if (menuBurger) {
                    menuBurger.classList.add('is-active');
                }

                if (menuBackdrop) {
                    menuBackdrop.classList.add('is-active');
                }

                if (menuPopup) {
                    menuPopup.classList.add('is-visible');
                    menuPopup.setAttribute('aria-disabled', false);

                    setTimeout(() => {
                        menuPopup.classList.add('is-active');
                    }, 1);
                }

                isMenuOpen = true;

                lockBody();

                setTimeout(() => {
                    isMenuReady = true;

                    if (menuClose) {
                        menuClose.focus();
                    }
                }, delay);
            }
        };

        /**
            * Closing the menu
        */
        const closeMenu = () => {
            if (isMenuReady) {
                isMenuReady = false;

                if (menuBurger) {
                    menuBurger.classList.remove('is-active');
                    menuBurger.focus();
                }

                if (menuBackdrop) {
                    menuBackdrop.classList.remove('is-active');
                }

                if (menuPopup) {
                    menuPopup.classList.remove('is-active');
                    menuPopup.setAttribute('aria-disabled', true);

                    setTimeout(() => {
                        menuPopup.classList.remove('is-visible');
                    }, delay);
                }

                isMenuOpen = false;

                unlockBody();

                setTimeout(() => {
                    isMenuReady = true;
                }, delay);
            }
        };

        /**
            * Set popup dialog mode
        */
        const setPopupDialogMode = () => {
            if (menuPopup) {
                if (isAdaptiveMenu()) {
                    menuPopup.setAttribute('role', 'dialog');
                    menuPopup.setAttribute('aria-modal', true);
                } else {
                    menuPopup.removeAttribute('role');
                    menuPopup.removeAttribute('aria-modal');
                }
            }
        };

        setPopupDialogMode();

        menuDropdownItems.forEach((item) => {
            const menuLink = item.querySelector('.js-menu-link');
            const submenu = item.querySelector('.js-menu-submenu');
            let isOpenSubmenu = true;

            if (menuLink) {
                menuLink.addEventListener('click', (e) => {
                    e.preventDefault();

                    if (isAdaptiveMenu()) {
                        if (isOpenSubmenu) {
                            isOpenSubmenu = false;
                            submenu.style.maxHeight = null;

                            if (item.classList.contains('is-visible')) {
                                submenu.style.maxHeight = `${submenu.scrollHeight}px`;
                                setTimeout(() => {
                                    submenu.style.maxHeight = `0px`;
                                }, 1);
                            } else {
                                submenu.style.maxHeight = `${submenu.scrollHeight}px`;
                            }

                            setTimeout(() => {
                                isOpenSubmenu = true;
                                submenu.style.maxHeight = null;

                                if (item.classList.contains('is-active')) {
                                    item.classList.remove('is-active');
                                } else {
                                    item.classList.add('is-active');
                                }
                            }, duration);

                            item.classList.toggle('is-visible');
                        }
                    } else {
                        item.classList.toggle('is-active');
                        item.classList.toggle('is-visible');
                    }
                });
            }

            item.addEventListener('mouseenter', () => {
                if (!isAdaptiveMenu()) {
                    item.classList.add('is-active', 'is-visible');
                }
            });

            item.addEventListener('mouseleave', () => {
                if (!isAdaptiveMenu()) {
                    item.classList.remove('is-active', 'is-visible');
                }
            });
        });

        if (menuBurger) {
            menuBurger.addEventListener('click', () => {
                if (menuBurger.classList.contains('is-active')) {
                    closeMenu();
                } else {
                    openMenu();
                }
            });
        }

        if (menuClose) {
            menuClose.addEventListener('click', () => {
                closeMenu();
            });
        }

        if (menuBackdrop) {
            menuBackdrop.addEventListener('click', () => {
                closeMenu();
            });
        }

        document.addEventListener('keydown', (e) => {
            if ((e.code === 'Escape' || e.key === 'Escape') && isMenuOpen) {
                closeMenu();
            }

            if ((e.code === 'Tab' || e.key === 'Tab') && isMenuOpen && menuPopup) {
                focusCatcher(e, menuPopup);
            }
        });

        document.addEventListener('keyup', (e) => {
            const activeDropdown = menu.querySelector('.js-menu-dropdown.is-active');

            if ((e.code === 'Tab' || e.key === 'Tab')
                && activeDropdown && !isAdaptiveMenu()
                && !document.activeElement.closest('.js-menu-dropdown.is-active')) {
                activeDropdown.classList.remove('is-active', 'is-visible');
            }
        });

        document.addEventListener('click', (e) => {
            const activeDropdown = menu.querySelector('.js-menu-dropdown.is-active');

            if (activeDropdown && !isAdaptiveMenu()) {
                if (!e.target.classList.contains('js-menu-dropdown')
                && !e.target.closest('.js-menu-dropdown')) {
                    activeDropdown.classList.remove('is-active', 'is-visible');
                }
            }
        });

        window.addEventListener('resize', setPopupDialogMode);
    }
}
