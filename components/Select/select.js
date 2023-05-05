import Choices from 'choices.js';

/*
	Choices.js
	https://github.com/Choices-js/Choices
*/

export default function select() {
	const selects = document.querySelectorAll('[data-select]');

	if (!selects) return;
	
	selects.forEach(item => {
		const choices = new Choices(item, {
			searchEnabled: false,
			itemSelectText: '',
			shouldSort: false
		});
	});
}
