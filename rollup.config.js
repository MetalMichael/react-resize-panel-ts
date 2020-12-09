import babel from 'rollup-plugin-babel';
import pkg from './package.json';
import postcss from 'rollup-plugin-postcss';
import resolve from 'rollup-plugin-node-resolve';
import commonjs from 'rollup-plugin-commonjs';
import typescript from 'rollup-plugin-typescript';

export default [
	// CommonJS (for Node) and ES module (for bundlers) build.
	{
		input: 'src/main.ts',
		external: ['react','react-dom'],
		output: [
			{ file: pkg.main, format: 'cjs' },
			{ file: pkg.module, format: 'es' }
		],
		plugins: [
			resolve(),
			commonjs({
				exclude: ['src/**'],
				namedExports: {'node_modules/lodash.debounce/index.js' : ['debounce']}	
			}),		
			postcss({modules: true}),
			babel({
				exclude: ['node_modules/**']
			}),
			typescript(),
		]
	}
];
