'use strict';
const { v4: uuidv4 } = require('uuid');
const { exec, spawn } = require("child_process");
const fs = require('fs');
const path = require('path');
/*
py is string of python program to be judged
problem = {
  number: INT,
  cases: INT
};
*/
function compile (py, problem, callback) {
  // Assign unique ID to submission
  var id = uuidv4();
  // Create all the files
  fs.writeFileSync(path.join('judging/temp', id + '.py'), py);
  var createFiles = exec('cat judging/in/' + problem.number.toString() + '.txt | ' + 'python3 judging/temp/' + id + '.py > judging/out/' + id + '.txt', (err, stdout, stderr) => {
    if (err) throw err;
  });
  createFiles.on('exit', () => {
    // Judge
    var judge = exec('judging/judge.out judging/out/' + id + '.txt judging/test/' + problem.number.toString() + '/ ' + problem.cases.toString(), (err, stdout, stderr) => {
      if (err) throw err;
      if (stderr) callback(stderr);
      if (stdout) callback(stdout);
    });
    /*
    var run = spawn('judging/judge.out', ['judging/out/' + id + '.txt', 'judging/test/' + problem.number.toString() + '/', problem.cases.toString()]);
    run.stdout.on('data', data => {
      console.log(1);
      callback(data.toString());
    });
    run.stderr.on('data', data => {
      callback(data.toString());
    });
    run.on('error', err => {
      throw err;
    });
    run.on('exit', () => {
      exec('rm judging/temp/' + id + '.py && rm judging/out/' + id + '.txt', (err, stdout, stderr) => {
        if (err) throw err;
      });
    });
    */
   judge.on('exit', () => {
    exec('rm judging/temp/' + id + '.py && rm judging/out/' + id + '.txt', (err, stdout, stderr) => {
      if (err) throw err;
    });
   })
  });
}
module.exports = compile;
