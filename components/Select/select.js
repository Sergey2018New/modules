import Choices from 'choices.js';

/*
	Choices.js
	https://github.com/Choices-js/Choices
*/

export default function select() {
	const selects = document.querySelectorAll('[data-select]');

	if (selects.length) {
		selects.forEach((item) => {
			new Choices(item, {
				searchEnabled: false,
				itemSelectText: '',
				shouldSort: false
			});
		});
	}
}
