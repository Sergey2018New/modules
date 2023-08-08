import Swiper from 'swiper';
import {
    Keyboard,
    Navigation,
    Pagination,
    Scrollbar,
    FreeMode,
} from 'swiper/modules';

/*
	Swiper
	https://swiperjs.com/swiper-api
*/

new Swiper('.js-slider-swiper', {
	modules: [Keyboard, Navigation, Pagination, Scrollbar, FreeMode],
	keyboard: {
		enabled: true,
		onlyInViewport: true,
	},
    freeMode: true,
	slidesPerView: 2,
	spaceBetween: 15,
	loop: false,
	navigation: {
	  prevEl: '.js-slider-prev',
	  nextEl: '.js-slider-next',
	},
	pagination: {
		el: '.js-slider-pagination',
		clickable: true,
	},
	scrollbar: {
		el: '.js-slider-scrollbar',
		draggable: true,
		snapOnRelease: false,
	},
	breakpoints: {
		576: {
		  slidesPerView: 2,
		  spaceBetween: 20,
		},
	},
});
