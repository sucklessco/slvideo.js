import eventDispatcher from "./eventDispatcher.js";
const addDocumentEventListeners = (videoEl, rootEl, _data) => {
	document.addEventListener("fullscreenchange", () => {
		if (_data.isFullscreen === true) {
			eventDispatcher(rootEl, "exitFullscreen");
			_data.isFullscreen = false;
		} else if (
			document.fullscreenElement === rootEl ||
			document.fullscreenElement === videoEl
		) {
			eventDispatcher(rootEl, "enterFullscreen");
			_data.isFullscreen = true;
		}
	});
};

export default addDocumentEventListeners;
