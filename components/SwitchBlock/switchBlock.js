export default function switchBlock() {
	const switchBlocks = document.querySelectorAll('[data-switch]');

	for (let i = 0; i < switchBlocks.length; i += 1) {
		const switchBlock = switchBlocks[i];
		const switchBackground = switchBlock.querySelector('[data-switch-background]');
		const switchMenu = switchBlock.querySelector('[data-switch-menu]');
		const switchButtons = switchBlock.querySelectorAll('[data-switch-button]');
		const switchButtonActive = switchBlock.querySelector('[data-switch-button].is-active');
		const switchLabel = switchBlock.querySelector('[data-switch-label]');
		const switchItemActive = switchBlock.querySelector('[data-switch-item].is-active');
		const switchCheckbox = switchBlock.querySelector('[data-switch-checkbox]');

		const offsetSwitchBackground = (switchMenu, switchButton, switchBackground) => {
			if (switchMenu && switchButton && switchBackground) {
				const offsetActiveItem = switchButton.getBoundingClientRect();
				const left = Math.floor(switchButton.offsetLeft - switchMenu.offsetLeft) +  'px';
				const width = offsetActiveItem.width + 'px';

				switchBackground.style.transform = `translate3d(${left}, 0 , 0)`;
				switchBackground.style.width = width;
			}
		}

		const toggleCheckbox = (target, switchItemFirst, switchItemSecond) => {
			if (target && switchItemFirst && switchItemSecond) {
				if (target.checked === true) {
					switchItemFirst.classList.remove('is-active');
					switchItemSecond.classList.add('is-active');
				} else {
					switchItemFirst.classList.add('is-active');
					switchItemSecond.classList.remove('is-active');
				}
			}
		}

		if (switchLabel) {
			offsetSwitchBackground(switchLabel, switchItemActive, switchBackground);
		}

		if (switchMenu) {
			offsetSwitchBackground(switchMenu, switchButtonActive, switchBackground);
		}

		if (switchCheckbox) {
			switchCheckbox.addEventListener('change', (event) => {
				const target = event.target;
				const switchItemFirst = switchBlock.querySelector('[data-switch-item="1"]');
				const switchItemSecond = switchBlock.querySelector('[data-switch-item="2"]');

				toggleCheckbox(target, switchItemFirst, switchItemSecond);

				offsetSwitchBackground(switchLabel, switchBlock.querySelector('[data-switch-item].is-active'), switchBackground);
			});
		}

		for (let j = 0; j < switchButtons.length; j += 1) {
			const switchButton = switchButtons[j];

			switchButton.addEventListener('click', () => {
                const buttonActive = switchBlock.querySelector('[data-switch-button].is-active');

                if (buttonActive) {
                    buttonActive.classList.remove('is-active');
                }

				switchButton.classList.add('is-active');

				offsetSwitchBackground(switchMenu, switchButton, switchBackground);
			});
		}

		window.addEventListener("resize", () => {
			if (switchLabel) {
				offsetSwitchBackground(switchLabel, switchBlock.querySelector('[data-switch-item].is-active'), switchBackground);
			}

			if (switchMenu) {
				offsetSwitchBackground(switchMenu, switchBlock.querySelector('[data-switch-button].is-active'), switchBackground);
			}
		});

		document.addEventListener("scroll", () => {
			if (switchLabel) {
				offsetSwitchBackground(switchLabel, switchBlock.querySelector('[data-switch-item].is-active'), switchBackground);
			}

			if (switchMenu) {
				offsetSwitchBackground(switchMenu, switchBlock.querySelector('[data-switch-button].is-active'), switchBackground);
			}
		});
	}
}
