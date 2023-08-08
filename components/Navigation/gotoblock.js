import SmoothScroll from "smooth-scroll";

/*
	Модуль плавной прокрутки к блоку
*/

export let gotoBlock = (targetBlock, isHeader = false, speed = 500, offset = 0, fixedHeaderSelector) => {
	let headerItem = '';

	if (isHeader) {
		headerItem = '.header.is-fixed';
	}

	if (fixedHeaderSelector) {
		headerItem = fixedHeaderSelector;
	}

	let options = {
		speedAsDuration: true,
		speed: speed,
		header: headerItem,
		offset: offset,
		easing: 'easeOutQuad',
	};

	const targetBlockElement = document.querySelector(targetBlock);
	targetBlockElement ? new SmoothScroll().animateScroll(targetBlockElement, '', options) : console.log(`[gotoBlock] - Такого блока нет: ${targetBlock}`);
};
