/**
 * Using Promise.all, write a function, combineFirstLineOfManyFiles, that:
 *    1. Reads each file at the path in the `filePaths` array
 *    2. Plucks the first line of each file
 *    3. Joins each first line into a new file
 *      - The lines should be in the same order with respect to the input array
 *      - i.e. the second line in the new file should be the first line of `filePaths[1]`
 *    4. Writes the new file to the file located at `writePath`
 */
var fs = require('fs');
var Promise = require('bluebird');
var promiseConstructor = require('../../exercises/bare_minimum/promiseConstructor.js');
const _ = require('underscore');
var readFileAsync = Promise.promisify(fs.readFile);
var writeFileAsync = Promise.promisify(fs.writeFile);

var combineFirstLineOfManyFiles = function(filePaths, writePath) {

  var promises = [];
  filePaths.forEach( file => {
    var promise = new Promise( (resolve, reject) => {
      fs.readFile(file, (err, rawData) => {
        if (err) {
          reject(new Error(`Error reading ${file}`));
        } else {
          var data = rawData.toString().split('\n')[0];
          resolve(data);
        }
      });
    });

    promises.push(promise);

  });

  return Promise.all(promises)
    .then( lines => lines.join('\n'))
    .then( writeData => writeFileAsync(writePath, writeData))
    .catch( err => console.error(err));

};

// Export these functions so we can unit test them
module.exports = {
  combineFirstLineOfManyFiles: combineFirstLineOfManyFiles
};