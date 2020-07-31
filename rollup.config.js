import babel from "@rollup/plugin-babel";
import json from "@rollup/plugin-json";

export default {
	input: "src/js/slvideo.js",
	output: {
		file: "dist/slvideo.js",
		format: "umd",
		name: "slvideojs"
	},
	watch: {
		chokidar: true,
		clearScreen: true,
		exclude: "",
		include: "src/**"
	},
	plugins: [
		json(),
		babel({
			exclude: "node_modules/**",
			babelHelpers: "bundled",
			presets: [
				[
					"@babel/preset-env",
					{
						targets: {
							browsers: "> 0.5%, ie >= 11"
						},
						modules: false,
						spec: true,
						useBuiltIns: "usage",
						forceAllTransforms: true,
						corejs: {
							version: 3,
							proposals: false
						}
					}
				]
			]
		})
	]
};
