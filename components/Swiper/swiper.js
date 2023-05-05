// import Swiper, { Keyboard, Navigation, Pagination, Scrollbar } from 'swiper';

/*
	Swiper
	https://swiperjs.com/swiper-api
*/

new Swiper('.js-slider-swiper', {
	modules: [Keyboard, Navigation, Pagination, Scrollbar],
	keyboard: {
		enabled: true,
		onlyInViewport: true,
	},
	slidesPerView: 2,
	spaceBetween: 15,
	loop: false,
	navigation: {
	  prevEl: '.js-slider-prev',
	  nextEl: '.js-slider-next'
	},
	pagination: {
		el: '.js-slider-pagination',
		clickable: true
	},
	scrollbar: {
		el: '.js-slider-scrollbar',
		draggable: true,
		snapOnRelease: false
	},
	breakpoints: {
		576: {
		  slidesPerView: 2,
		  spaceBetween: 20,
		}
	}
});

// Init slider with max width
function initSlider(sliderSelector, options, maxWidth = 991) {
	if (!sliderSelector) return;

	if (!options) {
		let options = {};
	}

	const sliderItems = document.querySelectorAll(sliderSelector);

	if (sliderItems) {
		sliderItems.forEach(slider => {
			let swiperSliders;
		
			function initializeSlider () {
				swiperSliders = new Swiper(slider, options);
			};
		
			function updateSlider() {
				if (window.innerWidth <= maxWidth) {
					if (!slider.classList.contains("swiper-initialized")) {
						initializeSlider();
					}
				}
		
				if (window.innerWidth > maxWidth) {
					if (slider.classList.contains("swiper-initialized")) {
						swiperSliders.destroy();
					}
				}
			};
		
			updateSlider();
		
			window.addEventListener("resize", () => {
				updateSlider();
			});
		});
	}
}
