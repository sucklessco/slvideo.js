import { version } from "./../../package.json";
import slvideojsMethodsAttacher from "./slvideojsMethodsAttacher.js";
import addDocumentEventListeners from "./addDocumentListeners.js";
import addVideoEventListeners from "./addVideoEventListeners.js";

const videoplayers = [];

// List of names of registered UIs
const registeredUIs = {};

// List of of registered Plugins
const registeredPlugins = {};

const slvideojs = function(el, opts) {
	opts = opts || {};
	opts.ui = opts.ui || {};
	opts.ui.name = opts.ui.name || "default";
	opts.plugins = opts.plugins || {};
	let _internalPlayerData = {
		isContentVideo: true,
		plugins: {},
		playbackEventsTriggered: {
			firstStart: false,
			contentStart: false,
			contentFirstQuartile: false,
			contentMidPoint: false,
			contentThirdQuartile: false,
			contentEnd: false
		}
	};
	if (!el) return false;
	if (el.$slvideojs) {
		return el.$slvideojs;
	}

	el.setAttribute("crossorgin", "");
	el.setAttribute("playsinline", "");
	el.removeAttribute("controls");
	el.classList.remove("slvideojs");
	const rootEl = document.createElement("div");
	rootEl.className = "slvideojs";
	el.parentNode.insertBefore(rootEl, el);
	const container = document.createElement("div");
	container.className = "ui-container";
	container.appendChild(el);
	rootEl.appendChild(container);

	slvideojsMethodsAttacher({
		rootEl: rootEl,
		registeredUIs: registeredUIs,
		registeredPlugins: registeredPlugins,
		internalPlayerData: _internalPlayerData,
		playerConfig: opts
	});

	addVideoEventListeners(el, rootEl, _internalPlayerData);
	addDocumentEventListeners(el, rootEl, _internalPlayerData);

	videoplayers.push(rootEl.$slvideojs);

	// Register an UI to the player.
	_internalPlayerData.ui = new registeredUIs[opts.ui.name]();
	_internalPlayerData.ui.uiName = opts.ui.name;
	_internalPlayerData.ui.init(rootEl.$slvideojs);

	return rootEl.$slvideojs;
};

slvideojs.getAllVideoplayers = () => videoplayers;

slvideojs.version = version;

slvideojs.getAllRegisteredPlugins = function() {
	return registeredPlugins;
};

slvideojs.registerPlugin = function(plugin, cb) {
	if (plugin.pluginName in registeredPlugins) {
		return cb("Plugin " + plugin.pluginName + " already registered!");
	} else {
		registeredPlugins[plugin.pluginName] = plugin;
		return cb(false);
	}
};

slvideojs.getAllRegisteredUIs = function() {
	return registeredUIs;
};

slvideojs.registerUI = function(ui, cb) {
	if (ui.uiName in registeredUIs) {
		return cb("UI " + ui.uiName + " already registered!");
	} else {
		registeredUIs[ui.uiName] = ui;
		return cb(false);
	}
};

slvideojs.init = function(opts) {
	opts = opts || {};
	opts.player = opts.player || {};
	let i = 0;
	const players = document.querySelectorAll("video.slvideojs");
	const len = players.length;
	for (; i < len; i++) {
		const player = players[i];
		new slvideojs(player, opts.player);
	}
	return videoplayers;
};

export default slvideojs;
