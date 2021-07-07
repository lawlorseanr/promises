/*
 * Write a function WITH NO CALLBACKS that,
 * (1) reads a GitHub username from a `readFilePath`
 *     (the username will be the first line of the file)
 * (2) then, sends a request to the GitHub API for the user's profile
 * (3) then, writes the JSON response of the API to `writeFilePath`
 *
 * HINT: We exported some similar promise-returning functions in previous exercises
 */

var fs = require('fs');
var Promise = require('bluebird');

var promiseConstructor = require('../../exercises/bare_minimum/promiseConstructor.js');
var pluckFirstLineFromFileAsync = promiseConstructor.pluckFirstLineFromFileAsync;

var promisificaion = require('../../exercises/bare_minimum/promisification.js');
var getGitHubProfileAsync = promisificaion.getGitHubProfileAsync;

var writeFileAsync = Promise.promisify(fs.writeFile);

var fetchProfileAndWriteToFile = function(readFilePath, writeFilePath) {

  return pluckFirstLineFromFileAsync(readFilePath)
    .then( profile => {
      return getGitHubProfileAsync(profile);
    })
    .then( response => {
      var stringyResponse = JSON.stringify(response);
      return writeFileAsync(writeFilePath, stringyResponse);
    })
    .catch( err => {
      console.error(`Error: ${err}.`);
    });

};

// Export these functions so we can test them
module.exports = {
  fetchProfileAndWriteToFile: fetchProfileAndWriteToFile
};
