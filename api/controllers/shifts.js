import connection from '../lib/sql.js'
import verifyRequest from '../lib/verifyRequest';

const javavscriptToMySQLDate = dateStr => new Date(Date.parse(dateStr)).toJSON().slice(0, 19).replace('T', ' ');

class Shifts {

	getAll(req, res) {
		const userID = parseInt(req.params.userID, 10);
		if (!userID) return res.status(400).send({ success: false, message: 'please specify a user to get shifts for' });
		
		const { start, end } = req.query;
		const wheres = ['fk_user = ?'];
		const vals = [userID];
		if(start) {
			wheres.push('startTime >= ?');
			vals.push(javavscriptToMySQLDate(start));
		}
		if(end) {
			wheres.push('endTime <= ?');
			vals.push(javavscriptToMySQLDate(end));
		}

		connection.query(`SELECT * FROM shifts WHERE ${wheres.join(' AND ')} ORDER BY startTime`, vals, (err, rows) => {
			if(err) throw err;
			return res.status(200).send(rows);
		});
	}

	getById(req, res) {
		const id = parseInt(req.params.id, 10);
		connection.query('SELECT * FROM shifts WHERE id = ?', id, (err, rows) => {
			if(err) throw err;
			if(!rows.length) return res.status(404).send({ success: false, message: 'shift not found'});
			return res.status(200).send(rows);
		});
	}

	post(req, res) {
		const userID = parseInt(req.params.userID, 10);
		if (!userID) return res.status(400).send({ success: false, message: 'please specify a user to post shifts for' });

		const { body } = req;
		const required = ['start', 'end'];
		
		const missing = verifyRequest.missing(body, required);
		if(missing.length) return res.status(400).send({ success: false, message: `missing values for ${missing.join(', ')}` });

		const startTime = javavscriptToMySQLDate(body.start);
		const endTime = javavscriptToMySQLDate(body.end);

		connection.query('SELECT * FROM shifts where startTime BETWEEN ? AND ? AND endTime BETWEEN ? AND ? AND fk_user = ?',
			[startTime, endTime, startTime, endTime, userID],
			(err, rows) => {
				if(err) throw(err);
				if(rows.length) return res.status(409).send({ success: false, message: 'shift times conflict with another shift for this user' });
				
				const post = { startTime, endTime, fk_user: userID };
				connection.query('INSERT INTO shifts SET ?', post, (err) => {
					if(err) throw err;
					return res.status(200).send({ success: true });
				});
			});
	}

	put(req, res) {
		const shiftID = parseInt(req.params.id, 10);
		const { body } = req;

		let startTime = (body.start) ? javavscriptToMySQLDate(body.start) : null;
		let endTime = (body.end) ? javavscriptToMySQLDate(body.end) : null;

		if(!startTime && !endTime) return res.status(400).send({ success: false, message: `you can only modify the start or end time of an existing shift` });
		
		//check for conflicting shifts before updating
		connection.query('SELECT * FROM shifts WHERE id = ?',shiftID, (err, curr) => {
			if(err) throw err;
			if(!startTime) startTime = curr[0].startTime;
			if(!endTime) endTime = curr[0].endTime;
			const userID = curr[0].fk_user;

			connection.query('SELECT * FROM shifts where (startTime BETWEEN ? AND ?) AND (endTime BETWEEN ? AND ?) AND fk_user = ?',
				[startTime, endTime, startTime, endTime, userID],
				(err, rows) => {
					if(err) throw(err);
					if(rows.length) return res.status(409).send({ success: false, message: 'shift times conflict with another shift for this user' });
					
					const put = { startTime, endTime };
					connection.query('UPDATE shifts SET ? WHERE id = ?', [put, shiftID], (err) => {
						if(err) throw err;
						return res.status(200).send({ success: true });
					});
				});
		});
	}

	delete(req, res) {
		const id = parseInt(req.params.id, 10);
		connection.query('DELETE FROM shifts WHERE id = ?', id, (err) => {
			if(err) throw err;
			return res.status(200).send({ success: true });
		});
	}
}

const shifts = new Shifts(); 

export default shifts;
