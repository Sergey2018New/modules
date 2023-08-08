import { CountUp } from 'countup.js';

/*
	  ------------
	|   Animation  |
	  ------------

	* Basic Attributes:
		* data-anim - attribute to set animation to element
		* data-delay - attribute to set animation delay
		* data-anim-always - play animation every time the block comes into view
		* data-anim-number - attribute to animate numbers
			** The attribute value contains a number
			** data-anim-number-suffix - attribute to add a suffix after a number
				*** The suffix is ​​specified in the attribute value
*/

export default function animation() {
	const animItems = document.querySelectorAll('[data-anim]');

	if (animItems.length) {
		const animStart = 2;

		/**
		 	* Get get the position of the animation block
			* @param  {Element} el - HTML animation block
		*/
		const offset = (el) => {
			const rect = el.getBoundingClientRect();
			const scrollLeft = window.scrollX || document.documentElement.scrollLeft;
			const scrollTop = window.scrollY || document.documentElement.scrollTop;
		
			return {
				top: rect.top + scrollTop,
				left: rect.left + scrollLeft
			}
		};

		/**
		 	* Animation of a specific block
			* @param  {Element} animItem - HTML animation block
		*/
		const showAnim = (animItem) => {
			const animDelay = Number(animItem.getAttribute('data-delay')) || 0;
			const animItemHeight = animItem.offsetHeight;
			const animItemOffset = offset(animItem).top;
			let animItemPoint = window.innerHeight - animItemHeight / animStart;
		
			if (animItemHeight > window.innerHeight) {
				animItemPoint = window.innerHeight - window.innerHeight / animStart;
			}
		
			if ((window.scrollY > animItemOffset - animItemPoint) && window.scrollY < (animItemOffset + animItemHeight)) {
				if (!animItem.classList.contains('is-anim')) {
					setTimeout(() => {
						animItem.classList.add('is-anim');
	
						if (animItem.hasAttribute('data-anim-number')) {
							const countUp = new CountUp(animItem, Number(animItem.getAttribute('data-anim-number')), {
								suffix: animItem.hasAttribute('data-anim-number-suffix') ? animItem.getAttribute('data-anim-number-suffix') : '',
								duration: 3
							}); 
							countUp.start();
						}
					}, animDelay);
				}
			} else {
				if (animItem.hasAttribute('data-anim-always')) {
					animItem.classList.remove('is-anim');
				}
			}
		};

		/**
		 	* Animation of all blocks in view
		*/
		const animOnScroll = () => {
			animItems.forEach((animItem) => {
				showAnim(animItem);
			});
		};

		setTimeout(() => {
			animOnScroll();
		}, 300);

		window.addEventListener('scroll', animOnScroll);
	}
}
