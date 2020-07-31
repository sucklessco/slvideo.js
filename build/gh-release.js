require("dotenv").config();
const ghrelease = require("gh-release");
const pkg = require("../package.json");
const options = {
	owner: "gorilla-videoplayer",
	repo: "gorilla-videoplayer",
	body: "Foo",
	assets: ["./dist/gorilla-videoplayer-" + pkg.version + ".zip"],
	endpoint: "https://api.github.com",
	auth: {
		token: process.env.GH_RELEASE_GITHUB_API_TOKEN
	}
};

let i = process.argv.length;

while (i--) {
	const arg = process.argv[i];

	if (arg === "-p" || arg === "--prerelease") {
		options.prerelease = true;
	}
}

ghrelease(options, function(err, result) {
	if (err) {
		console.error("Unable to publish release to github");
		console.error("err:", err);
		console.error("result:", result);
	} else {
		console.log("Publish release to github!");
	}
});
