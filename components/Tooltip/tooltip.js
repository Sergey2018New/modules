import tippy from 'tippy.js';

/*
	Tippyjs
	https://atomiks.github.io/tippyjs/
*/

export default function tooltip(tooltipContainer) {
	let tooltips;

	if (tooltipContainer) {
		if (tooltipContainer instanceof Node) {
			tooltips = tooltipContainer.querySelectorAll('[data-tooltip]');
		}
	} else {
		tooltips = document.querySelectorAll('[data-tooltip]');
	}

	if (tooltips.length) {
		const tooltipInit = (tooltip) => {
			tooltip.setAttribute('data-tooltip-init', '');
	
			let tooltipContent = tooltip.getAttribute('title') || tooltip.getAttribute('data-tooltip-content') || '';
			let tooltipTrigger = tooltip.getAttribute('data-tooltip-trigger') || 'focus';
	
			if (tooltipContent) {
				tippy(tooltip, {
					content: tooltip.getAttribute('title') || tooltip.getAttribute('data-tooltip-content') || '',
					allowHTML: true,
					trigger: tooltipTrigger,
					placement: 'top-start',
					maxWidth: 300,
					animation: 'shift-toward',
					offset: 0,
				});
			}
		}
	
		for (let i = 0; i < tooltips.length; i++) {
			const tooltip = tooltips[i];
			
			if (!tooltip.hasAttribute('data-tooltip-init')) {
				tooltipInit(tooltip);
			}
		}
	}
}
