/*
	  -------------
	|   FIELD BOX   |
	  -------------

	* Basic Attributes:
		* data-field-box - field wrapper
		* data-field-box-input - input element
*/
/**
    * @param  {Element} containerEl - HTML container element, default document
*/
export default function fieldBox(containerEl) {
	let fiedlsItems;

	if (containerEl) {
		if (containerEl instanceof Node) {
			fiedlsItems = containerEl.querySelectorAll('[data-field-box]');
		}
	} else {
		fiedlsItems = document.querySelectorAll('[data-field-box]');
	}

    if (fiedlsItems.length) {
        fiedlsItems.forEach((item) => {
            const changeInput = (inputEl) => {
                const val = inputEl.value.trim();

                if (val !== "") {
                    item.classList.add('is-filed');
                } else {
                    item.classList.remove('is-filed');
                }
            }

            const fieldInit = () => {
                const inputEl = item.querySelector('[data-field-box-input]');

                item.setAttribute('data-field-box-init', '');

                if (inputEl) {
                    changeInput(inputEl);

                    inputEl.onfocus = () => {
                        item.classList.add('is-focused');
                    };

                    inputEl.onblur = () => {
                        item.classList.remove('is-focused');
                    };

                    inputEl.addEventListener('change', () => {
                        changeInput(inputEl);
                    });
                }
            }

            if (!item.hasAttribute('data-field-box-init')) {
                fieldInit();
            }
        });
    }
}
