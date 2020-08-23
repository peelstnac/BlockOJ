const fs = require('fs').promises;
const path = require('path');

const PROBLEMS_ROOT = path.resolve(__dirname, '../problems');

let _problemsObj = null;

async function fetchProblems () {
	if (_problemsObj) return _problemsObj;

	_problemsObj = {};

	// Load if null
	const problems = await fs.readdir(PROBLEMS_ROOT, { withFileTypes: true });
	for (const folder of problems) {
		const res = path.resolve(PROBLEMS_ROOT, folder.name);
		if (folder.isDirectory()) {
			const data = require(path.join(res, 'data.json'));
			_problemsObj[data.name] = data;
		}
	}

	return _problemsObj;
}

module.exports = { fetchProblems };