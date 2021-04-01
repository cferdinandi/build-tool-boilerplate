var sass = require('sass');
var fs = require('fs');
var pkg = require('./package.json');


// Configs
var configs = {
	name: 'BuildToolsCookbook',
	files: ['main.scss'],
	pathIn: 'src/scss',
	pathOut: 'dist/css',
	indentType: 'tab',
	indentWidth: 1,
	minify: true,
	sourceMap: false
};

// Banner
var banner = `/*! ${configs.name ? configs.name : pkg.name} v${pkg.version} | (c) ${new Date().getFullYear()} ${pkg.author.name} | ${pkg.license} License | ${pkg.repository.url} */`;

var getOptions = function (file, filename, minify) {
	return {
		file: `${configs.pathIn}/${file}`,
		outFile: `${configs.pathOut}/${filename}`,
		sourceMap: configs.sourceMap,
        	sourceMapContents: configs.sourceMap,
		indentType: configs.indentType,
		indentWidth: configs.indentWidth,
		outputStyle: minify ? 'compressed' : 'expanded'
	};
};

var writeFile = function (pathOut, fileName, fileData, printBanner = true) {
    // Create the directory path
    fs.mkdir(pathOut, { recursive: true }, function (err) {
        // If there's an error, throw it
        if (err) throw err;

        // Write the file to the path
        fs.writeFile(`${pathOut}/${fileName}`, fileData, function (err) {
            if (err) throw err;

            var data = fs.readFileSync(`${pathOut}/${fileName}`);
            var fd = fs.openSync(`${pathOut}/${fileName}`, 'w+');
            var insert = printBanner ? new Buffer.from(banner + '\n') : '';
            fs.writeSync(fd, insert, 0, insert.length, 0);
            fs.writeSync(fd, data, 0, data.length, insert.length);
            fs.close(fd, function (err) {
                if (err) throw err;
                console.log(`Compiled ${pathOut}/${fileName}`);
            })
        })
    })
}

var parseSass = function (file, minify) {
    var filename = `${file.slice(0, file.length - 5)}${minify ? '.min' : ''}.css`;
    sass.render(getOptions(file, filename, minify), function (err, result) {

	// If there's an error, throw it
	if (err) throw err;

        // Write the file
        writeFile(configs.pathOut, filename, result.css);

        if (configs.sourceMap && !configs.sourceMapEmbed) {
            // Write external sourcemap
            writeFile(configs.pathOut, filename + '.map', result.map, false);
        }
    });
};

configs.files.forEach(function (file) {
    parseSass(file);
    if (configs.minify) {
	    parseSass(file, true);
    }
});
