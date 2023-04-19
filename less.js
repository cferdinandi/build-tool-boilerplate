var less = require('less');
var path = require('path');
var fs = require('fs');
var pkg = require('./package.json');


// Configs
var configs = {
	name: 'BuildToolsCookbook',
	files: ['main2.less'],
	pathIn: 'src/less',
	pathOut: 'dist/css',
	minify: true,
	sourceMap: false
};

// Banner
var banner = `/*! ${configs.name ? configs.name : pkg.name} v${pkg.version} | (c) ${new Date().getFullYear()} ${pkg.author.name} | ${pkg.license} License | ${pkg.repository.url} */`;

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

var parseLess = function (file, minify) {
    var filename = `${file.slice(0, file.length - 5)}${minify ? '.min' : ''}.css`;
    less.render(fs.readFileSync(`${configs.pathIn}/${file}`).toString(), {
        filename: path.resolve(`${configs.pathIn}/${file}`),
        compress: minify,
        sourceMap: configs.sourceMap,
    }, function(e, output) {
        writeFile(configs.pathOut, filename, output.css);
    });
}

configs.files.forEach(function (file) {
    parseLess(file);
    if (configs.minify) {
	    parseLess(file, true);
    }
});
