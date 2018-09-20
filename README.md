
# Inferno + TypeScript + Rollup Example

I’ve been working on upgrading an Inferno 3/TypeScript 2/Webpack 3/Babel 6 project to the latest versions (Inferno 5/TypeScript 3/Webpack 4/Babel 7 as of writing this). There have been a lot of changes to these tools and libraries, so instead of trying to alter the existing configuration for my project, I decided to start fresh.

## Webpack vs. Rollup

There is a lot of overlap between the functionality of these two tools. I find that, while Webpack has more features, Rollup is easier to configure. Depending on your use case this will be different. Webpack is not _only_ a JavaScript bundler—according to its README, Webpack is ‘capable of transforming, bundling, or packaging just about any resource or asset’. Rollup, on the other hand, specializes in JavaScript module bundling. If that’s all you need, then Rollup is probably a better choice.

## Rollup + TypeScript

There are two methods of performing TypeScript transpilation from Rollup: [rollup-plugin-typescript](https://github.com/rollup/rollup-plugin-typescript) and [rollup-plugin-babel](https://github.com/rollup/rollup-plugin-babel) combined with [@babel/preset-typescript](https://babeljs.io/docs/en/next/babel-preset-typescript.html) (introduced with Babel 7). I’ve opted for the latter method because it allows TypeScript compilation to be automatic for any tool downstream of Babel. Since we use Babel for JSX compilation as well (using [babel-plugin-inferno
](https://github.com/infernojs/babel-plugin-inferno)), we can also keep the TypeScript and JSX compilation steps together.

Neither of these options performs type checking as part of the bundling process—they simply strip type annotations and compile your code as JavaScript. By including `noEmit: true` in `tsconfig.json` (or using `--noEmit` on the command line) you can run the TypeScript compiler (`npx tsc`) to check types without generating any files.

I’ve opted to place all TypeScript and JSX configuration in `src/.babelrc.js`. Babel will pick up this configuration regardless of where it is run from. However, in order for Babel to see TypeScript files you’ll also need to add `.ts` and `.tsx` to Babel’s list of file extensions by including the `extensions` parameter for rollup-plugin-babel (see `rollup.config.js`) or by using the `--extensions` flag when running the Babel CLI. Unfortunately there isn’t a way to include this parameter in `.babelrc.js`.
