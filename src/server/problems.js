const { Router } = require('express');
const { fetchProblems } = require('./problem-reader');

const router = new Router();

router.get('/:problemId', async (req, res) => {
	const problem = (await fetchProblems())[req.params.problemId];
	res.render('problem', {
		problem
	});
});

module.exports = router;