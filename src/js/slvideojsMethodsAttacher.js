import eventDispatcher from "./eventDispatcher.js";
const slvideojsMethodsAttacher = function(opts) {
	opts = opts || {};

	const rootEl = opts.rootEl;
	const registeredUIs = opts.registeredUIs;
	const registeredPlugins = opts.registeredPlugins;
	const internalPlayerData = opts.internalPlayerData;

	const videoEl = rootEl.querySelector("video");

	rootEl.$slvideojs = {
		play: () => {
			videoEl.play();
			return rootEl.$slvideojs;
		},
		replay: () => {
			videoEl.pause();
			videoEl.currentTime = 0;
			videoEl.play();
			eventDispatcher(rootEl, "replay");
			return rootEl.$slvideojs;
		},
		stop: () => {
			videoEl.pause();
			videoEl.currentTime = 0;
			eventDispatcher(rootEl, "stop");
			return rootEl.$slvideojs;
		},
		pause: () => {
			videoEl.pause();
			return rootEl.$slvideojs;
		},
		isPlaying: () => {
			return !videoEl.paused;
		},
		resetTrackedPlaybackEvents: () => {
			internalPlayerData.playbackEventsTriggered = {
				firstStart: false,
				contentStart: false,
				contentFirstQuartile: false,
				contentMidPoint: false,
				contentThirdQuartile: false,
				contentEnd: false
			};
			return rootEl.$slvideojs;
		},
		setContentVideo: contentVideo => {
			internalPlayerData.contentVideo = contentVideo;
			videoEl.src = contentVideo.src;
			rootEl.$slvideojs.resetTrackedPlaybackEvents();
			return rootEl.$slvideojs;
		},
		getContentVideo: () => {
			return internalPlayerData.contentVideo;
		},
		getIsContentVideo: () => {
			return internalPlayerData.isContentVideo;
		},
		setIsContentVideo: v => {
			internalPlayerData.isContentVideo = v;
			return rootEl.$slvideojs;
		},
		getEl: () => {
			return rootEl;
		},
		getVideoEl: () => {
			return videoEl;
		},
		toggleFullscreen: () => {
			if (document.fullscreen) {
				document.exitFullscreen();
			} else {
				rootEl.requestFullscreen();
			}
		},
		initPlugin: function(pluginName) {
			internalPlayerData.plugins[pluginName] = new registeredPlugins[
				pluginName
			]();
			internalPlayerData.plugins[pluginName].init(opts);
			return true;
		},
		deInitPlugin: function(pluginName) {
			internalPlayerData.plugins[pluginName].deInit(opts);
			return true;
		},
		initUI: function(uiName) {
			internalPlayerData.previousUIName = this.getUIName();
			internalPlayerData.ui = new registeredUIs[uiName]();
			internalPlayerData.ui.uiName = uiName;
			internalPlayerData.ui.init(rootEl.$slvideojs);
			return true;
		},
		deInitUI: function() {
			internalPlayerData.ui.deInit(rootEl.$slvideojs);
			return true;
		},
		getUIName: () => {
			return internalPlayerData.ui.uiName;
		},
		getPreviousUIName: () => {
			return internalPlayerData.previousUIName;
		}
	};

	return rootEl.$slvideojs;
};

export default slvideojsMethodsAttacher;
