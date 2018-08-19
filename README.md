# Files-Migrate

This README outlines the details of Files-Migrate script that copies files from one directory to another and deletes the file
from soure if options are specified via command line.

## Prerequisites

You will need the following things properly installed on your computer.

* [Git](http://git-scm.com/)
* [Node.js](http://nodejs.org/) (with NPM)

## Installation

* `git clone <repository-url>` this repository

## Running the script

* `node index.js source-path destination-path file-type delete-options`

### Description

  Pass options flag as d or D for deleting files from source path specified. You can leave the delete-options empty if you 
dont want the files to be deleted in the source path

eg) Folder structure
    
    a 
    |
    b - file1.txt
    |
    c - d - file2.txt
    |
    e - f - g - file3.txt
 
 If i need to move all the .txt files under folder 'a' to some other folder say 'x' the the command will be    
 `node index.js /a /x .txt` and if the files under 'a' folder needs to be deleted the command is 
 `node index.js /a /x .txt D` or `node index.js /a /x .txt d`.
 
* source-path (mandatory)
* destination-path (mandatory)
* file-type (mandatory)
* delete-options (optional)
