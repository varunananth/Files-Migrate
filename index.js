const path = require('path');
const fs = require('fs');
const args = process.argv.slice(2);
const chalk = require('chalk');
const deleteOption = args[3];
const sourcePath = args[0];
const destinationPath = args[1];
const extension = args[2];
var count = 0;
var filesList = [];

function moveFiles(sourcePath, extension) {

  if (!fs.existsSync(sourcePath)) {
    console.log(`${chalk.red('Invalid directory :')} ${sourcePath}`);
    return;
  }
  var files = fs.readdirSync(sourcePath);
  for (var i = 0; i < files.length; i++) {

    var filename = path.join(sourcePath, files[i]);
    var destination = path.join(destinationPath, files[i])
    var stat = fs.lstatSync(filename);
    if (stat.isDirectory()) {
      moveFiles(filename, extension);
    } else if (files[i].indexOf(extension) >= 0) {
      filesList[count] = filename;
      count = count + 1;
      fs.copyFile(filename, destination, (err) => {
        if (err) {
          throw err;
        }
      });
      console.log('\t' + `${count} : moved file: ${chalk.green(files[i])} from src path ${chalk.green(filename)} to destination path ${chalk.green(destination)}`);
    };
  };

};

function deleteSourceFile() {
  for (filename of filesList) {
    fs.unlink(filename, (err) => {
      if (err) {
        throw err;
      }
    });
  }
}

if (fs.existsSync(sourcePath) && fs.existsSync(destinationPath) && extension) {

  if (deleteOption === 'D' || deleteOption === 'd') {
    Promise.resolve().then(function() {
      moveFiles(sourcePath, extension);
    }.bind(sourcePath, extension)).then(function() {
      deleteSourceFile();
    });
  } else if (deleteOption != undefined) {
    console.log('\n\t' + 'Invalid delete options passed, files in source will not be deleted');
    moveFiles(sourcePath, extension);
  } else {
    console.log('\n\t' + 'Files in source will not be deleted');
    moveFiles(sourcePath, extension);
  }
  console.log('\n');
} else {
  if (!fs.existsSync(sourcePath) && !fs.existsSync(destinationPath)) {
    console.log('\n\t' + `Both source (${chalk.red(sourcePath)}) and Destination (${chalk.red(sourcePath)}) paths does not exit`);
  } else if (!fs.existsSync(sourcePath)) {
    console.log('\n\t' + `Source path ${chalk.red(sourcePath)} does not exits`);
  } else if (!fs.existsSync(destinationPath)) {
    console.log('\n\t' + `Destination path ${chalk.red(destinationPath)} does not exits`);
  } else if (extension === null || extension === undefined) {
    console.log('\n\t' + chalk.red('Specify the file type'));
  }
  console.log('\n');
}
