/*
     ----------------
	|  HEADER  MENU  |
	 ----------------
*/

export default function headerMenu(maxWidth = 991, delay = 300) {
    /* 
		@param  {number} delay - menu opening time (also needs to be changed in CSS)
		@param  {number} maxWidth - the maximum width of the browser at which the nested menu fires when clicked
	*/

    const menu = document.querySelector('.js-menu');

    if (!menu) return;
    
    const menuBurger = menu.querySelector('.js-menu-burger');
    const menuBody = menu.querySelector('.js-menu-body');
    const menuOverlay = menu.querySelector('.js-menu-overlay');
    const menuClose = menu.querySelector('.js-menu-close');
    const menuDropdownItems = menu.querySelectorAll('.js-menu-dropdown');
    let isMenu = true;

    menuDropdownItems.forEach(item => {
        const menuLink = item.querySelector('.js-menu-link');
        const menuList = item.querySelector('.js-menu-submenu');

        if (menuList && menuLink) {
            menuLink.addEventListener('click', (e) => {
                if (window.innerWidth <= maxWidth) {
                    e.preventDefault();
                    item.classList.toggle('is-active');
                }
            }); 
        }
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

    if (menuOverlay) {
        menuOverlay.addEventListener('click', () => {
            closeMenu();
        });
    }

    function openMenu () {
        if (isMenu) {
            isMenu = false;

            if (menuBurger) {
                menuBurger.classList.add('is-active');
            }

            if (menuOverlay) {
                menuOverlay.classList.add('is-active');
            }
            
            if (menuBody) {
                menuBody.classList.add('is-visible');

                setTimeout(() => {
                    menuBody.classList.add('is-active');
                }, 1);
            }
    
            document.body.classList.add('is-menu-active');

            setTimeout(() => {
                isMenu = true;
            }, delay);
        }
    }

    function closeMenu () {
        if (isMenu) {
            isMenu = false;

            if (menuBurger) {
                menuBurger.classList.remove('is-active');
            }

            if (menuOverlay) {
                menuOverlay.classList.remove('is-active');
            }
            
            if (menuBody) {
                menuBody.classList.remove('is-active');

                setTimeout(() => {
                    menuBody.classList.remove('is-visible');
                }, delay);
            }
            
            document.body.classList.remove('is-menu-active');

            setTimeout(() => {
                isMenu = true;
            }, delay);
        }
    }
}
