/** Is valid url
 * @param {string} url - url text
*/
function isValidUrl(url) {
	var objRE = /(^https?:\/\/)?[a-z0-9~_\-\.]+\.[a-z]{2,9}(\/|:|\?[!-~]*)?$/i;
	return objRE.test(url);
}

/** Is valid email
 * @param {string} email - email text
*/
function isValidEmail(email)
{
	var objRE = /^(([^<>()[\].,;:\s@"]+(\.[^<>()[\].,;:\s@"]+)*)|(".+"))@(([^<>()[\].,;:\s@"]+\.)+[^<>()[\].,;:\s@"]{2,})$/iu;
	return objRE.test(email);
}

/** Show more text
*/
function showMoreText() {
    document.addEventListener('click', (event) => {
        const { target } = event;
        const isMoreTextButton = target.classList.contains('js-more-text-button') ?
        target : target.closest('.js-more-text-button');

        if (isMoreTextButton) {
            const moreTextBlock = isMoreTextButton.closest('.js-more-text');

            if (moreTextBlock) {
                moreTextBlock.classList.add('is-active');
            }

            event.preventDefault();
        }
    });
}

/** Set rows height in product comparison
*/
function setRowsHeightCompare() {
    const compareItems = document.querySelectorAll('.js-compare-item');
    const compareAllRows = document.querySelectorAll('.js-compare-row');
    const setRowsHeight = () => {
        let maxRowsHeight = [];

        for (let i = 0; i < compareAllRows.length; i += 1) {
            const currentRow = compareAllRows[i];
            currentRow.style.height = null;
        }

        for (let i = 0; i < compareItems.length; i += 1) {
            const compareItem = compareItems[i];
            const rows = compareItem.querySelectorAll('.js-compare-row');

            for (let j = 0; j < rows.length; j += 1) {
                const currentRow = rows[j];
                const rowHeight = currentRow.getBoundingClientRect().height;

                if (!maxRowsHeight[j]) {
                    maxRowsHeight[j] = rowHeight;
                }

                if (rowHeight > maxRowsHeight[j]) {
                    maxRowsHeight[j] = rowHeight;
                }
            }
        }

        for (let i = 0; i < compareItems.length; i += 1) {
            const compareItem = compareItems[i];
            const rows = compareItem.querySelectorAll('.js-compare-row');

            for (let j = 0; j < rows.length; j += 1) {
                const currentRow = rows[j];
                currentRow.style.height = `${maxRowsHeight[j]}px`;
            }
        }
    };

    setRowsHeight();

    window.addEventListener('resize', () => {
        setRowsHeight();
    });
}
