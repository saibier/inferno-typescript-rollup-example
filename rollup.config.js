

import alias from 'rollup-plugin-alias'
import babel from 'rollup-plugin-babel'
import commonjs from 'rollup-plugin-commonjs'
import compiler from '@ampproject/rollup-plugin-closure-compiler'
import replace from 'rollup-plugin-replace'
import resolve from 'rollup-plugin-node-resolve'


const extensions = ['.js', '.jsx', '.ts', '.tsx']
const isProduction = process.env.NODE_ENV == 'production'


// https://rollupjs.org/guide/en
export default {
	input: 'src/index.tsx',
	output: {
		file: isProduction ? 'dist/bundle.min.js' : 'dist/bundle.js',
		format: 'iife'
	},
	plugins: [
		// https://github.com/rollup/rollup-plugin-replace#usage
		replace({
			'process.env.NODE_ENV': JSON.stringify(isProduction ? 'production' : 'development')
		}),

		// https://github.com/rollup/rollup-plugin-babel#usage
		// https://babeljs.io/docs/en/options
		babel({
			extensions, // See `npx babel --help`
			presets: [
				// https://babeljs.io/docs/en/babel-preset-env#options
				isProduction ? ["@babel/preset-env", {
					targets: {
						ie: "9"
					},
					useBuiltIns: 'usage'
				}] : {}
			],
			include: isProduction ? '**' : 'src/**',
			// Prevent `useBuiltIns` from causing a loop:
			exclude: 'node_modules/core-js/**'
		}),

		// https://github.com/infernojs/inferno#rollup
		// https://github.com/rollup/rollup-plugin-alias#usage
		!isProduction && alias({
			inferno: 'node_modules/inferno/dist/index.dev.esm.js'
		}),

		// https://github.com/rollup/rollup-plugin-node-resolve#usage
		resolve({
			extensions,
			browser: true
		}),

		// https://github.com/rollup/rollup-plugin-commonjs#usage
		commonjs({
			include: 'node_modules/**'
		}),

		// https://github.com/google/closure-compiler/wiki/Flags-and-Options
		isProduction && compiler({
			compilation_level: 'ADVANCED',
			language_in: 'ECMASCRIPT_2017',
			language_out: 'ECMASCRIPT3'
		})
	]
};

