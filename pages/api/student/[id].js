import { Client } from 'cassandra-driver';

export default async function handler(req, res) {
    const client = new Client({
        cloud: {
            secureConnectBundle: './secure-connect-student-cassandra.zip',
        },
        credentials: {
            username: 'ReGNBkdsTBZdrStZltUIfkwQ',
            password:
                'Gi3e8AyBFX+CqkZt6AxATeDTcSZPbBeZUcyPiyFDqgFgaqi8sXEx,pzt5leNDO_.K20uolr,552tPcTG2qGqZ+rB1m.fojlXbZ0pJ916RJrDA6iQIZdURl704-Be8kNP',
        },
    });

    await client.connect();

    if (req.method === 'DELETE') {
        const rs = await client.execute(
            `delete from student.information where id = ${req.query.id}`
        );

        res.status(204).json({ message: 'Success' });
    } else if (req.method === 'PUT') {
        const rs = await client.execute(
            `update student.information set name = '${req.body.name}', gender = ${req.body.gender}, gpa = ${req.body.gpa} where id = ${req.query.id}`
        );
        res.status(200).json({ message: 'Success' });
    } else {
        res.status(501).json({ message: 'Wrong method' });
    }
    client.shutdown();
}
