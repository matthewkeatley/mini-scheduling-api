import connection from '../lib/sql.js'
import verifyRequest from '../lib/verifyRequest';

const javavscriptToMySQLDate = dateStr => new Date(Date.parse(dateStr)).toJSON().slice(0, 19).replace('T', ' ');

class Shifts {

	getAll(req, res) {
		const { start, end } = req.query;
		const wheres = [];
		const vals = [];
		if(start) {
			wheres.push('startTime >= ?');
			vals.push(javavscriptToMySQLDate(start));
		}
		if(end) {
			wheres.push('endTime <= ?');
			vals.push(javavscriptToMySQLDate(end));
		}

		connection.query(`SELECT * FROM shifts ${wheres.length ? 'WHERE ' + wheres.join(' AND ') : ''} ORDER BY startTime`, vals, (err, rows) => {
			if(err) throw err;
			return res.status(200).send(rows);
		});
	}
}

const shifts = new Shifts(); 

export default shifts;
