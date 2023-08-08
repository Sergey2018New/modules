/*
	  -----------------
	|   PROGRESS RING   |
	  -----------------

	* Basic Attributes:
		* data-progress-ring - svg progress circle element
		    * data-value - percentage value
		* data-progress-ring-backdrop - HTML element circle backdrop sector
		* data-progress-ring-sector - HTML element circle main sector
*/

export default function progressRing() {
    const progressRing = document.querySelectorAll('[data-progress-ring]');

    if (progressRing.length) {
        /**
            * @param  {Number} value - percentage value
            * @param  {Element} progressItem - HTML element circle sector
        */
        const initProgressRing = (value, progressItem) => {
            const backdrop = progressItem.querySelector('[data-progress-ring-backdrop]');
            const sector = progressItem.querySelector('[data-progress-ring-sector]');
            let radius;
            let dashArray;
            let dashOffset;

            if (backdrop) {
                radius = sector.getAttribute('r');
                dashArray = 2 * 3.14 * radius;
                dashOffset = dashArray - dashArray * value / 100;

                sector.setAttribute('stroke-dasharray', dashArray.toFixed(3));
                sector.setAttribute('stroke-dashoffset', dashOffset.toFixed(3));
            }

            if (backdrop) {
                radius = backdrop.getAttribute('r');
                dashArray = 2 * 3.14 * radius;
                dashOffset = dashArray - dashArray * (100 - value) / 100;

                backdrop.setAttribute('stroke-dasharray', dashArray.toFixed(3));
                backdrop.setAttribute('stroke-dashoffset', dashOffset.toFixed(3));
            }
        };

        progressRing.forEach((progressItem) => {
            let value = Number(progressItem.getAttribute('data-value')) || 100;

            initProgressRing(value, progressItem);
        });
    }
}
