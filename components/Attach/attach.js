/*
	  -----------
	|   Attach   |
	  -----------

	* Basic Attributes:
		* data-attach - file attachment label
		* data-attach-input - file attachment input
		* data-attach-text - file attachment text
*/

export default function attach() {
	document.addEventListener('change', (event) => {
		const { target } = event;

		if (target.hasAttribute('data-attach-input')) {
			const attachInput = target;
			const attach = attachInput.closest('[data-attach]');
			const attachText = attach.querySelector('[data-attach-text]');
			const name = target.files[0].name;

			if (attachText && name) {
				attachText.textContent = name;
			}
		}
	});
}
