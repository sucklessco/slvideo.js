const createNewEvent = eventName => {
	let event;
	if (typeof Event === "function") {
		event = new Event(eventName);
	} else {
		event = document.createEvent("Event");
		event.initEvent(eventName, true, true);
	}
	return event;
};
const dispatchEvent = (el, eventName) => {
	const e = createNewEvent(eventName);
	el.dispatchEvent(e);
};

export default dispatchEvent;
