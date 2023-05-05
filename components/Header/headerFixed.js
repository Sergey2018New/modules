/*
     --------------- 
	|   FIX HEADER   |
	  ---------------
*/

export default function headerFixed() {
    const header = document.querySelector('.header');

    if (!header) return;

    const fixedStartClass = 'is-fixed-start';
    const fixedClass = 'is-fixed';
    const fixedClassVisible = 'is-fixed-visible';
    const isAddHeight = true;
    let offsetTop = 0;
    let scrollPos = 0;
    let scrollTop = 0;
    let headerHeight;
    let positionTop; 

    fixed();

	window.addEventListener('scroll', fixed);
	
	function fixed() {
		scrollTop = window.pageYOffset;
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
	}
}
