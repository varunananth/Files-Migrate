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
    } else if (filename.indexOf(extension) >= 0) {
      filesList[count] = filename;
      count = count + 1;
      fs.copyFile(filename, destination, (err) => {
         if (err) {
           throw err;
         }
       });
       console.log(`${count} : moved file: ${chalk.green(files[i])} from src path ${chalk.green(filename)} to destination path ${chalk.green(destination)}`);
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

if(fs.existsSync(sourcePath) && fs.existsSync(destinationPath) && extension) {

    if (deleteOption === 'D' || deleteOption === 'd') {
      Promise.resolve().then(function(){
        moveFiles(sourcePath, extension);
      }.bind(sourcePath, extension)).then(function(){
        deleteSourceFile();
      });
    } else if(deleteOption != undefined) {
      console.log('\n'+'Invalid delete options passed, files in source will not be deleted');
      moveFiles(sourcePath, extension);
    } else {
      console.log('\n'+'Files in source will not be deleted');
      moveFiles(sourcePath, extension);
    }
    console.log('\n');
} else {
   if(extension === null || extension === undefined)  {
     console.log('\n'+'specify the file type');
   }
   else if(!fs.existsSync(sourcePath) && !fs.existsSync(destinationPath)) {
     console.log('\n'+`Both source (${chalk.red(sourcePath)}) and Destination (${chalk.red(sourcePath)}) paths does not exit`);
   } else if(!fs.existsSync(sourcePath)) {
      console.log('\n'+`Source path ${chalk.red(sourcePath)} does not exits`);
    } else {
      console.log('\n'+`Destination path ${chalk.red(destinationPath)} does not exits`);
    }
    console.log('\n');
}
