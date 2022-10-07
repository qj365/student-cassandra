import { Client } from 'cassandra-driver';

export default async function handler(req, res) {
    if (req.method === 'POST') {
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

        // Execute a query
        const rs = await client.execute(
            `insert into student.information(id,name,gender,gpa) values (uuid(),'${req.body.name}', ${req.body.gender}, ${req.body.gpa})`
        );

        res.status(200).json({ message: 'Success' });

        await client.shutdown();
    } else {
        res.status(501).json({ message: 'Wrong method' });
    }
}
