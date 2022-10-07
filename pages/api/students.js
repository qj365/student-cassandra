import { Client } from 'cassandra-driver';
import path from 'path';

export default async function handler(req, res) {
    if (req.method === 'GET') {
        console.log(process.cwd());
        const client = new Client({
            cloud: {
                secureConnectBundle: path.join(
                    process.cwd(),
                    'json',
                    'secure-connect-student-cassandra.zip'
                ),
            },
            credentials: {
                username: 'ReGNBkdsTBZdrStZltUIfkwQ',
                password:
                    'Gi3e8AyBFX+CqkZt6AxATeDTcSZPbBeZUcyPiyFDqgFgaqi8sXEx,pzt5leNDO_.K20uolr,552tPcTG2qGqZ+rB1m.fojlXbZ0pJ916RJrDA6iQIZdURl704-Be8kNP',
            },
        });

        await client.connect();

        let query = `select * from student.information`;

        if (req.query.id) {
            query += ` where id = ${req.query.id}`;
        }
        if (req.query.name) {
            query.includes('where')
                ? (query += ` and name = '${req.query.name}'`)
                : (query += ` where name = '${req.query.name}'`);
        }
        if (req.query.gender) {
            query.includes('where')
                ? (query += ` and gender = ${req.query.gender}`)
                : (query += ` where gender = ${req.query.gender}`);
        }
        if (req.query.gpaFrom) {
            query.includes('where')
                ? (query += ` and gpa >= ${req.query.gpaFrom}`)
                : (query += ` where gpa >= ${req.query.gpaFrom}`);
        }
        if (req.query.gpaTo) {
            query.includes('where')
                ? (query += ` and gpa <= ${req.query.gpaTo}`)
                : (query += ` where gpa <= ${req.query.gpaTo}`);
        }

        const rs = await client.execute(query + ' ALLOW FILTERING');

        console.log(query);

        res.status(200).json(rs.rows);

        await client.shutdown();
    } else {
        res.status(501).json({ message: 'Wrong method' });
    }
}
