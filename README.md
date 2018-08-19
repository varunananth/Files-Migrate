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

* `node index.js source-path destination-path file-type delete-options. You can leave the delete-options empty if you 
dont want the files to be deleted in the source path`

Pass options flag as d or D for deleting files from source path specified.
* source-path (mandatory)
* destination-path (mandatory)
* file-type (mandatory)
* delete-options (optional)
