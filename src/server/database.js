const { Pool } = require('pg');

const pool = new Pool();

pool.on('error', (err) => {
	console.error(err);
});

async function query (queryString, params) {
	const client = await pool.connect();
	try {
		const result = await client.query(queryString, params);
		if (!result || !result.rows || !result.rowCount) return undefined;
		return result.rows;
	} finally {
		client.release();
	}
}

async function transact (queryString, params) {
	const client = await pool.connect();
	try {
		await client.query('BEGIN');
		const res = await client.query(queryString, params);
		await client.query('COMMIT');
	} catch (err) {
		await client.query('ROLLBACK');
		throw err;
	} finally {
		client.release();
	}
}

module.exports = { query, transact, pool };