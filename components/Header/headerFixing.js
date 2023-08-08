/*
     ------------------
	|   HEADER FIXING   |
	  -----------------
*/
/**
  * Fixing header on scroll
*/
export default function headerFixing() {
    const header = document.querySelector('.js-header');

    if (header) {
        const fixedStartClass = 'is-fixed-start';
        const fixedClass = 'is-fixed';
        const fixedClassVisible = 'is-fixed-visible';
        const isAddHeight = true;
        let offsetTop = 0;
        let scrollPos = 0;
        let scrollTop = 0;
        let headerHeight;
        let positionTop;
        const fixed = () => {
            scrollTop = window.scrollY;
            headerHeight = header.offsetHeight;
            positionTop = header.getBoundingClientRect().top + scrollTop;
            offsetTop = headerHeight;

            if (scrollTop > (positionTop + offsetTop)) {
                header.classList.add(fixedStartClass);
            } else {
                header.classList.remove(fixedStartClass);
            }

            if (scrollTop > (positionTop + offsetTop * 1.5)) {
                if (isAddHeight) {
                    header.style.height = `${headerHeight}px`;
                }

                header.classList.add(fixedClass);

                if (scrollTop < scrollPos) {
                    header.classList.add(fixedClassVisible);
                } else {
                    header.classList.remove(fixedClassVisible);
                }
            } else {
                header.classList.remove(fixedClass, fixedClassVisible);

                if (isAddHeight) {
                    header.style.removeProperty('height');
                }
            }

            scrollPos = scrollTop;
        };

        fixed();

        window.addEventListener('scroll', fixed);
    }
}
