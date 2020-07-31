import { version } from "./../../package.json";
import slvideojs from "./slvideo.js";

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

const videoSource = document.createElement("source");
const videoEl = document.createElement("video");
videoEl.className = "slvideojs";
videoEl.appendChild(videoSource);
document.body.appendChild(videoEl);
slvideojs.init();

test("version should be the current version", () => {
	expect(slvideojs.version).toBe(version);
});

test("getAllVideoplayers() should NOT return an empty array", () => {
	expect(slvideojs.getAllVideoplayers().length).toBeGreaterThan(0);
});

test("Init should skip init and return an filled array", () => {
	expect(slvideojs.init().length).toBeGreaterThan(0);
});

test("should return false if no el is passed", () => {
	expect(slvideojs()).toBe(false);
});

test("should return the already initialized player instance", () => {
	const dummyObj = document.createElement("div");
	dummyObj.$slvideojs = {};
	expect(slvideojs(dummyObj)).toBe(dummyObj.$slvideojs);
});
