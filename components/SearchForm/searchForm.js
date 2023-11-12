/**
  * Search form result
*/

export default function searchForm() {
    const searchForm = document.querySelector('.js-search-form');

    if (searchForm) {
        const searchFormInput = document.querySelector('.js-search-form-input');
        const searchFormClear = document.querySelector('.js-search-form-clear');

        /**
         * Show search input clearing
        */
        const showSearchInputClear = () => {
            if (searchFormClear) {
                searchFormClear.classList.add('is-visible');
            }
        };

        /**
         * Hide search input clearing
        */
        const hideSearchInputClear = () => {
            if (searchFormClear) {
                searchFormClear.classList.remove('is-visible');
            }
        };

        /**
         * Checking input value
        */
        const checkingInputValue = () => {
            if (searchFormInput) {
                if (searchFormInput.value.trim() !== '') {
                    showSearchInputClear();
                } else {
                    hideSearchInputClear();
                }
            }
        };

        checkingInputValue();

        if (searchFormInput) {
            searchFormInput.addEventListener('input', () => {
                checkingInputValue();
            });
        }

        if (searchFormClear) {
            searchFormClear.addEventListener('click', () => {
                if (searchFormInput) {
                    searchFormInput.value = '';
                    searchFormInput.focus();
                }

                hideSearchInputClear();
            });
        }
    }
}
