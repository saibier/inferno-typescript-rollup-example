
module.exports = {
	presets: [
		// https://babeljs.io/docs/en/next/babel-preset-typescript.html
		// https://babeljs.io/docs/en/next/babel-plugin-transform-typescript.html
		"@babel/preset-typescript"
	],
	overrides: [{
		// https://github.com/infernojs/babel-plugin-inferno
		include: ["*.jsx", "*.tsx"],
		plugins: ["babel-plugin-inferno"]
	}]
}
