# Build Tool Boilerplate
A simple boilerplate for using NPM tasks to build and compile JavaScript, CSS, and image files.

**Install**

- [Install Node.js.](http://nodejs.org/)
- [Download the NPM Build Tool Boilerplate.](https://github.com/cferdinandi/build-tool-boilerplate/archive/master.zip)

**Quick Start**

Each task has just one or two dependencies (*except for image optimization*), so I recommend deleting the ones you don't need before running `npm install`. Learn more in [the documentation](#documentation) below.

1. In bash/terminal/command line, `cd` into your project directory.
2. Run `npm install`.
3. Run `npm run build`.



## Documentation

This is a boilerplate that you can use as a starting point for your projects.

[Running Tasks](#running-tasks) · [JavaScript](#javascript) · [Sass => CSS](#sass--css) · [SVG Optimization](#svg-optimization) · [Image Optimization](#image-optimization) · [Copy Files](#copy-files) · [Clean](#clean) · [Complete Build](#complete-build)


### Running Tasks

The boilerplate uses the `npm run` command to run tasks.

```bash
# Cross-Platform
npm run js    # compile and minify
npm run css   # compile and minify Sass into CSS
npm run svg   # optimize SVGs with SVGO
npm run img   # optimize image files

# macOS/Linux
npm run copy  # copy files from the src/copy directory as-is into /dist
npm run clean # delete the /dist directory
npm run build # run all tasks

# Windows
npm run copywin  # copy files from the src/copy directory as-is into /dist
npm run cleanwin # delete the /dist directory
npm run buildwin # run all tasks
```


### JavaScript

The boilerplate uses [rollup.js](https://rollupjs.org) with the [terser](https://terser.org/) plugin to parse, compile, and minify JavaScript files.

```json
{
    "devDependencies": {
        "rollup": "^2.6.1",
        "rollup-plugin-terser": "^5.3.0"
    }
}
```

In the `rollup.config.js` file, there's a `configs` object that you can use to control what rollup.js does.

```js
// Configs
var configs = {
    name: 'MyProject',                // Global namespace to use for IIFEs [optional]
    files: ['main.js', 'detects.js'], // The files to process
    formats: ['iife', 'es'],          // The formats to output - will be added as a suffix to the filename (ex. main.es.js)
    default: 'iife',                  // Files with this format will not have a format suffix [optional]
    pathIn: 'src/js',                 // The source directory for your JS files
    pathOut: 'dist/js',               // The directory to compile JS files into
    minify: true                      // If true, a minified version will also be created with the .min suffix
};
```

A banner is automatically generated from your `package.json` data.

It includes the project name and version, a copyright notice with the current year and the package author name, the license type, and a link to the project repository.

```js
// Banner
var banner = `/*! ${configs.name ? configs.name : pkg.name} v${pkg.version} | (c) ${new Date().getFullYear()} ${pkg.author.name} | ${pkg.license} License | ${pkg.repository.url} */`;
```

To concatentate multiple files into one, use the ES modules `import` feature.

```js
// myplugin.js
// This will compile into /dist/js/myplugin.js, and will include helpers.js, app.js, and event-listeners.js

import * as Helpers from './helpers.js';
import app from './app.js';
import './event-listeners.js';
```

JavaScript files should be in the `src/js` directory. Use this task to run the build.

```bash
npm run js
```


### Sass => CSS

The boilerplate uses the Node implementation of [dart-sass](https://sass-lang.com/dart-sass) to parse `.scss` files into CSS.

```json
{
    "devDependencies": {
        "sass": "^1.26.5"
    }
}
```

In the `sass.js` file, there's a `configs` object that you can use to control what `dart-sass` does.

```js
// Configs
var configs = {
    name: 'MyProject',    // The name to use in the file banner
    files: ['main.scss'], // The files to process
    pathIn: 'src/scss',   // The source directory for your Sass files
    pathOut: 'dist/css',  // The directory to compile CSS files into
    sourceMap: false,     // If true, will generate a sourcemap
    indentType: 'tab',    // The type of indenting to use ['tab'|'spaces']
    indentWidth: 1,       // How many tabs or spaces to indent
    minify: true          // If true, a minified version will also be created with the .min suffix
};
```

A banner is automatically generated from your `package.json` data.

It includes the project name and version, a copyright notice with the current year and the package author name, the license type, and a link to the project repository.

```js
// Banner
var banner = `/*! ${configs.name ? configs.name : pkg.name} v${pkg.version} | (c) ${new Date().getFullYear()} ${pkg.author.name} | ${pkg.license} License | ${pkg.repository.url} */`;
```

Sass files should be in the `src/scss` directory. Use this task to run the build.

```bash
npm run css
```


### SVG Optimization

The boilerplate uses [svgo](https://github.com/svg/svgo) to remove the cruft that gets added to SVG files by many editors.

```json
{
    "devDependencies": {
        "svgo": "^1.3.2",
    }
}
```

For accessibility reasons, the boilerplate disables the settings that remove the `title` element and `viewBox` attribute.

You can make additional comand line configurations under the `svg` tasks in the `scripts` property of the `package.json` file.

```bash
svgo -f src/svg dist/svg --disable=removeViewBox,removeTitle
```

SVGs should be in the `src/svg` directory. Use this task to run the build.

```bash
npm run svg
```


### Image Optimization

The boilerplate uses [imagemin](https://www.npmjs.com/package/imagemin), with the [MozJPEG](https://github.com/imagemin/imagemin-mozjpeg), [pngcrush](https://github.com/imagemin/imagemin-pngcrush), [pngquant](https://github.com/imagemin/imagemin-pngquant), and [zopfli](https://github.com/imagemin/imagemin-zopfli) plugins.

(*Yea, that's kind of lot, isn't it?*)

```json
{
    "devDependencies": {
        "imagemin-cli": "^5.1.0",
        "imagemin-mozjpeg": "^8.0.0",
        "imagemin-pngcrush": "^6.0.0",
        "imagemin-pngquant": "^8.0.0",
        "imagemin-zopfli": "^6.0.0",
    }
}
```

Image files should be in the `src/img` directory. Use this task to run the build.

```bash
npm run img
```

### Copy Files

If you have files you want copied as-is, place them in the `src/copy` directory.

There's no dependency for this task, but it does use unix/linux conventions that might not work on pre-bash Windows.

Use this task to run the build.

```bash
# macOS/Linux
npm run copy

# Windows
npm run copywin
```

### Clean

You can delete the `/dist` directory before running a build to clean up any junk that might have ended up there.

There's no dependency for this task, but it does use unix/linux conventions that might not work on pre-bash Windows.

```bash
# macOS/Linux
npm run clean

# Windows
npm run cleanwin
```


### Complete Build

You can run all of your build tasks in a single command.

Be sure to delete any tasks you're not using from the `build` tasks under `scripts` in your `package.json` file first. The `&&` joins tasks, just like in JavaScript.

```bash
# Example (not cross-platform)
npm run clean && npm run js && npm run css && npm run svg && npm run img && npm run copy
```

Use this task to run the build.

```bash
# macOS/Linux
npm run build

# Windows
npm run buildwin
```


## Why does this exist?

For years, I've been an avid [Gulp](https://gulpjs.com/) user. Gulp is great. But it's also *a lot*.

**I wanted a simpler, more resilient, leaner set of build tools.**

I'm tired of having to repair my build anytime I don't use it for a few months. I'm tired of installing 270mb of `node_modules` dependencies to build a simple website or web app.

With NPM, you can build a simplish build tool that does just what you want (*and nothing more*) with a fraction of the footprint.

❤️ *Major kudos to Keith Cirkel for [teaching me about this years ago](https://www.keithcirkel.co.uk/how-to-use-npm-as-a-build-tool/), before I was ready to hear it. Huge thanks to [Charles Roper](https://twitter.com/charlesroper) for creating Windows versions of some of the OS-specific terminal prompts.*