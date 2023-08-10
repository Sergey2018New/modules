export default function video() {
    const videos = document.querySelectorAll('[data-video]');
	const stopVideo = (video, videoFrame) => {
		if (!document.fullscreenElement) {
			videoFrame ? videoFrame.pause() : '';
			video ? video.classList.remove('is-play') : '';
		}
	};

	videos.forEach((videoItem) => {
		const videoPlay = videoItem.querySelector('[data-video-play]');

		if (videoPlay) {
			const videoFrame = videoItem.querySelector('[data-video-frame]');

			videoPlay.addEventListener('click', (event) => {
				event.preventDefault();

				// const src = videoPlay.getAttribute('data-src');
				// const videoIframe = `<iframe width="100%" height="100%" src="${src}" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"  allowfullscreen></iframe>`;

				if (!videoItem.classList.contains('is-play')) {
					const activeVideo = document.querySelector('[data-video].is-play');

					if (activeVideo) {
						const activeVideoFrame = activeVideo.querySelector('[data-video-frame]');

						activeVideo.classList.remove('is-play');

						if (activeVideoFrame) {
							activeVideoFrame.pause();
							activeVideoFrame.currentTime = 0;
						}
					}
					if (videoFrame) {
						videoFrame.currentTime = 0;
						videoFrame.play()
					}

					videoItem.classList.add('is-play');
				}
			});

			if (videoFrame) {
				videoFrame.addEventListener("pause", () => {
					stopVideo(videoItem, videoFrame);
				});

				videoFrame.addEventListener("ended", () => {
					stopVideo(videoItem, videoFrame);
				});

				videoFrame.addEventListener("fullscreenchange", () => {
					stopVideo(videoItem, videoFrame);
				}, false);

				videoFrame.addEventListener("webkitfullscreenchange", () => {
					stopVideo(videoItem, videoFrame);
				}, false);

				videoFrame.addEventListener("mozfullscreenchange", () => {
					stopVideo(videoItem, videoFrame);
				}, false);
			}
		}
	});
}
