/* eslint-disable class-methods-use-this */
// import db from '../db/db';
import connection from '../lib/sql.js'
import verifyRequest from '../lib/verifyRequest';

class Users {

	getAll(req, res) {
		connection.query('SELECT * FROM users', (err, rows) => {
			if(err) throw err;
			return res.status(200).send(rows);
		});
	}

	getById(req, res) {
		const id = parseInt(req.params.id, 10);
		connection.query('SELECT * FROM users WHERE id = ?', id, (err, rows) => {
			if(err) throw err;
			if(!rows.length) return res.status(404).send({ success: false, message: 'user not found'});
			return res.status(200).send(rows);
		});
	}

	post(req, res) {
		const { body } = req;
		const required = ['firstName', 'lastName'];
		const allowed = ['email', 'phone', 'isManager', 'contactMethod'];
		
		const missing = verifyRequest.missing(body, required);
		if(missing.length) return res.status(400).send({ success: false, message: `missing values for ${missing.join(', ')}` });

		const post = verifyRequest.strip(body, [...required, ...allowed]);
		connection.query(`INSERT INTO users SET ?`, post, (err) => {
			if(err) throw err;
			return res.status(200).send({ success: true });
		});
	}

	put(req, res) {
		const id = parseInt(req.params.id, 10);
		const { body } = req;
		const properties = ['firstName','lastName','email', 'phone', 'isManager', 'contactMethod'];

		const put = verifyRequest.strip(body, properties);
		connection.query(`UPDATE users SET ? WHERE id = ?`, [put, id], (err) => {
			if(err) throw err;
			return res.status(200).send({ success: true });
		});
	}

	delete(req, res) {
		const id = parseInt(req.params.id, 10);
		connection.query('DELETE FROM users WHERE id = ?', id, (err) => {
			if(err) throw err;
			return res.status(200).send({ success: true });
		});
	}
}

const users = new Users(); 

export default users;
