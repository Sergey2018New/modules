import { gotoBlock } from "./gotoblock.js";

/*
	  --------------
	|   NAVIGATION   |
	  --------------

	* Basic Attributes:
		* data-navigation - navigation list
            ** data-goto - an attribute specifying the navigation block selector
            ** data-offset - offset from window start
		* data-navigation-section - navigation section with ID
*/

export default function navigation() {
	const navigation = document.querySelector('[data-navigation]');

    if (navigation) {
        const navItems = navigation.querySelectorAll('[data-navigation-item]');
        const navItemFirst = navigation.querySelector(`[data-navigation-item]:first-child`);
        const navItemLast = navigation.querySelector(`[data-navigation-item]:last-child`);
        const fixedClass = 'is-fixed';
        let scrollTop = 0;
        let navHeight;
        let positionTop;
        let heightFixedNav;

        const getHeightFixedNav = () => {
            return window.innerWidth < 768 ? 42 : 60;
        };

        const pageNavigationScroll = () => {
            const elementsWatch = document.querySelectorAll('[data-navigation-section]');
            let offsetTop;
            scrollTop = window.scrollY;
            navHeight = navigation.getBoundingClientRect().height;
            positionTop = navigation.getBoundingClientRect().top + scrollTop + navHeight;
            heightFixedNav = getHeightFixedNav();

            if (scrollTop > positionTop) {
                document.documentElement.classList.add('is-fixed-navigation');
                navigation.classList.add(fixedClass);
                navigation.style.height = `${navHeight}px`;
            } else {
                document.documentElement.classList.remove('is-fixed-navigation');
                navigation.classList.remove(fixedClass);
                navigation.style.removeProperty('height');
            }

            for (let i = elementsWatch.length - 1; i >= 0; i--) {
                let navSection = elementsWatch[i];
                const clientRect = navSection.getBoundingClientRect();
                const { top: navSectionTop, height: navSectionHeight } = clientRect;
                const navItem = navigation.querySelector(`[data-navigation-item][data-goto="#${navSection.id}"]`);
                offsetTop = heightFixedNav;

                navItems.forEach((navCurrent) => {
                    navCurrent.classList.remove('is-active');
                });

                if (navItem) {
                    offsetTop += navItem.getAttribute('data-offset') ? Number(navItem.getAttribute('data-offset')) : 0;
                }

                if (scrollTop + offsetTop >= (navSectionTop + scrollTop - 2)) {
                    if (navItem) {
                        navItem.classList.add('is-active');
                    }

                    if (navItem === navItemLast
                        && scrollTop > (navSectionTop + scrollTop + navSectionHeight)) {
                        navigation.classList.remove(fixedClass);
                        navigation.style.removeProperty('height');
                    }

                    break;
                } else if (i === 0) {
                    navItemFirst.classList.add('is-active');
                }
            }
        };

        for (let i = 0; i < navItems.length; i += 1) {
            const navItem = navItems[i];

            navItem.addEventListener('click', function (event){
                let offset = navItem.getAttribute('data-offset') ? Number(navItem.getAttribute('data-offset')) : 0;
                const gotoLink = navItem.getAttribute('data-goto');
                const gotoLinkSelector = gotoLink ? gotoLink : '';

                gotoBlock(gotoLinkSelector, false, 600, offset + getHeightFixedNav());

                event.preventDefault();
            });
        }

        pageNavigationScroll();

        window.addEventListener("scroll", pageNavigationScroll);
    }
}
