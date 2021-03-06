'use strict';
const {v4: uuidv4} = require('uuid');
const {exec, spawn} = require("child_process");
const fs = require('fs');
const path = require('path');

const JUDGE_ROOT = path.resolve(__dirname, 'judging');

/*
js is string of JavaScript program to be judged
problem = {
  number: INT,
  cases: INT
};
*/
function compile(js, problem, callback) {

	const insert = String.raw`
	  	// INSERT INTO BEGINNING OF EVERY SUBMISSION
	  	const fs = require('fs');
	  	var COMPILE_ln = 0;
	  	var COMPILE_stdin = fs.readFileSync(0, 'utf-8').toString().split(/\r?\n/);
	  	const window = {
			prompt: () => {
				if (COMPILE_ln + 1> COMPILE_ln.length) {
					return '';
				}
      		return COMPILE_stdin[COMPILE_ln++];
      		},
	  	}
	`

	const LEFT = `

		var __MD792 = window.prompt();
	  	while(__MD792--) {

  	`;

	const RIGHT = `

  	}

  	`;

	// Insert
	js = insert + LEFT + js + RIGHT;

	// Assign unique ID to submission
	var id = uuidv4();

	// Create all the files
	fs.writeFileSync(path.join(JUDGE_ROOT, 'temp', id + '.js'), js.toString(), {flag: 'w'});

	let execStr = 'cat judging/in/' + problem.number.toString() + '.txt | ' + 'node judging/temp/' + id + '.js > judging/out/' + id + '.txt';

	var createFiles = exec(execStr.replace(/judging/g, JUDGE_ROOT), (err, stdout, stderr) => {
		if (err) throw err;
	});
	createFiles.on('exit', () => {
		// Judge
		execStr = 'judging/judge.out judging/out/' + id + '.txt judging/test/' + problem.number.toString() + '/ ' + problem.cases.toString();
		var judge = exec(execStr.replace(/judging/g, JUDGE_ROOT), (err, stdout, stderr) => {
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
			execStr = 'rm judging/temp/' + id + '.js && rm judging/out/' + id + '.txt';
			exec(execStr.replace(/judging/g, JUDGE_ROOT), (err, stdout, stderr) => {
				if (err) throw err;
			});
		})
	});
}

module.exports = compile;
