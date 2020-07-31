import eventDispatcher from "./eventDispatcher.js";
const addVideoEventListeners = (videoEl, rootEl, _data) => {
	videoEl.addEventListener("play", function() {
		if (this.currentTime > 0) {
			eventDispatcher(rootEl, "resume");
		} else {
			if (_data.playbackEventsTriggered.firstStart === true) {
				eventDispatcher(rootEl, "replay");
				_data.playbackEventsTriggered.contentStart = false;
				_data.playbackEventsTriggered.contentFirstQuartile = false;
				_data.playbackEventsTriggered.contentMidPoint = false;
				_data.playbackEventsTriggered.contentThirdQuartile = false;
				_data.playbackEventsTriggered.contentEnd = false;
			} else {
				eventDispatcher(rootEl, "play");
			}
		}
	});
	videoEl.addEventListener("seeked", function() {
		eventDispatcher(rootEl, "seeked");
	});
	videoEl.addEventListener("seeking", function() {
		eventDispatcher(rootEl, "seeking");
	});
	videoEl.addEventListener("pause", function() {
		if (this.currentTime !== this.duration) {
			eventDispatcher(rootEl, "pause");
		}
	});
	videoEl.addEventListener("volumechange", function() {
		if (this.muted) eventDispatcher(rootEl, "mute");
		else eventDispatcher(rootEl, "unmute");
	});
	videoEl.addEventListener("timeupdate", function() {
		const evts = _data.playbackEventsTriggered;
		const quartileDuration = this.duration / 4;
		if (!evts.firstStart && this.currentTime > 0) {
			evts.firstStart = true;
			eventDispatcher(rootEl, "firstStart");
		}
		if (_data.isContentVideo) {
			if (!evts.contentStart && this.currentTime > 1) {
				evts.contentStart = true;
				eventDispatcher(rootEl, "contentStart");
			}
			if (!evts.contentFirstQuartile && this.currentTime >= quartileDuration) {
				evts.contentFirstQuartile = true;
				eventDispatcher(rootEl, "contentFirstQuartile");
			}
			if (!evts.contentMidPoint && this.currentTime >= quartileDuration * 2) {
				evts.contentMidPoint = true;
				eventDispatcher(rootEl, "contentMidPoint");
			}
			if (
				!evts.contentThirdQuartile &&
				this.currentTime >= quartileDuration * 3
			) {
				evts.contentThirdQuartile = true;
				eventDispatcher(rootEl, "contentThirdQuartile");
			}
			if (!evts.contentEnd && this.currentTime === this.duration) {
				evts.contentEnd = true;
				eventDispatcher(rootEl, "contentEnd");
			}
		}
	});
};

export default addVideoEventListeners;
