import slvideojs from "./slvideo.js";
import slvideojsMethodsAttacher from "./slvideojsMethodsAttacher.js";

// Mock Default UI
const uiMock = function() {
	return {
		init: function() {},
		deInit: function() {}
	};
};
uiMock.uiName = "default";
uiMock.uiVersion = "1.0.0";

slvideojs.registerUI(uiMock, function() {});

// Mock registered UIs List
const registeredUIs = {};

const videoSource = document.createElement("source");
videoSource.source =
	"https://evilcdn.net/demo-videos/testspot-freeletics-aphrodite-4.29s-144p.mp4";
videoSource.type = "video/mp4";
const videoEl = document.createElement("video");
videoEl.className = "slvideojs";
videoEl.appendChild(videoSource);
document.body.appendChild(videoEl);
slvideojs.init();

const player1 = slvideojs.getAllVideoplayers()[0];
const methods = slvideojsMethodsAttacher({
	rootEl: player1.getEl(),
	registeredUIs: registeredUIs
});

test("play() should call video.play()", function() {
	const playStub = jest
		.spyOn(window.HTMLMediaElement.prototype, "play")
		.mockImplementation(() => {});

	methods.play();

	expect(playStub).toHaveBeenCalled();
	playStub.mockRestore();
});

test("there should be stop method", function() {
	const pauseStub = jest
		.spyOn(window.HTMLMediaElement.prototype, "pause")
		.mockImplementation(() => {});

	methods.stop();
	expect(pauseStub).toHaveBeenCalled();
	pauseStub.mockRestore();
});

test("pause() should return false if the video is already paused", function() {
	const pauseStub = jest
		.spyOn(window.HTMLMediaElement.prototype, "pause")
		.mockImplementation(() => {});

	methods.pause();
	expect(pauseStub).toHaveBeenCalled();
	pauseStub.mockRestore();
});

test("there should be isPlaying method", function() {
	expect(methods.isPlaying()).toBe(false);
});

test("there should be getEl method", function() {
	expect(methods.getEl()).toBe(player1.getEl());
});
