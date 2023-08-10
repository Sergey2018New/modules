export default function radioBlock() {
	const radioBlocksElements = document.querySelectorAll('.js-radio-block');

	for (let i = 0; i < radioBlocksElements.length; i += 1) {
		const radioBlockEl = radioBlocksElements[i];
		const radioBackground = radioBlockEl.querySelector('.js-radio-block-background');
		const radioItems = radioBlockEl.querySelector('.js-radio-block-items');
		const radioInputs = radioBlockEl.querySelectorAll('.js-radio-block-input');

		const offsetRadioBackground = () => {
            const radioItemActive = radioBlockEl.querySelector('.js-radio-block-item.is-active');

			if (radioItems && radioItemActive && radioBackground) {
				const offsetActiveItem = radioItemActive.getBoundingClientRect();
				const left = Math.floor(radioItemActive.offsetLeft - radioItems.offsetLeft) +  'px';
				const width = offsetActiveItem.width + 'px';

				radioBackground.style.transform = `translate3d(${left}, 0 , 0)`;
				radioBackground.style.width = width;
			}
		};

        offsetRadioBackground();

        for (let i = 0; i < radioInputs.length; i += 1) {
            const radioInput = radioInputs[i];

            radioInput.addEventListener('change', () => {
                const radioItemActive = radioBlockEl.querySelector('.js-radio-block-item.is-active');
                const radioItemCurrent =  radioInput.closest('.js-radio-block-item');

                if (radioItemActive) {
                    radioItemActive.classList.remove('is-active');
                }

                if (radioInput.checked && radioItemCurrent) {
                    radioItemCurrent.classList.add('is-active');
                }

                offsetRadioBackground();
            });
        }

		window.addEventListener("resize", () => {
            offsetRadioBackground();
		});

		document.addEventListener("scroll", () => {
            offsetRadioBackground();
		});
	}
}
