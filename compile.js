'use strict';
const { v4: uuidv4 } = require('uuid');
const { exec, sp } = require("child_process");
const fs = require('fs');
const path = require('path');
/*
* js is string of submission to be compiled
* callback may be called multiple times (once per verdict)
*/
function compile (js, callback) {
  var id = uuidv4();
  // Create a folder to hold user's submission
  exec('mkdir Judging/' + id, (err, stdout, stderr) => {
    if (err) {
      throw err;
    }
  });
  // Write the .js file
  fs.writeFileSync(path.join('Judging', id, 'submission.js'), js);
  // Compile



  
  exec('rm -r Judging/' + id, (err, stdout, stderr) => {
    if (err) {
      throw err;
    }
  });
}
module.exports = compile;
