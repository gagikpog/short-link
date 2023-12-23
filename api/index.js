const express = require('express');
const db = require('./src/database.js');
const cors = require('cors');
const { getKey } = require('./src/utils.js');
const app = express();
const HTTP_PORT = 8002;

app.use(express.urlencoded());
app.use(express.json());
app.use(cors({ origin: '*' }));

app.listen(HTTP_PORT, () => {
    console.log(`Server running on port ${HTTP_PORT}`);
});

app.get('/go/:id', (req, res) => {
    const id = req.params.id;

    const sql = 'SELECT * FROM data WHERE id = ?';
    const params = [id];

    db.get(sql, params, (err, row) => {

        if (err) {
            return res.status(400).json({ error: err.message });
        }

        if (!row) {
            return res.status(404).json({ error: 'link not found' });
        }

        const inputData = [(row.count || 0) + 1, id];
        const sql = 'UPDATE data SET count=? WHERE id=?';

        db.run(sql, inputData, () => {});

        res.redirect(row.link);
    });
});

app.post('/go/create', (req, res) => {
    const link = req.body && req.body.link;

    if (!link) {
        return res.status(400).json({ error: 'link required' });
    }

    const insert = 'INSERT INTO data (id, link) VALUES (?,?)';
    const id = getKey();
    db.run(insert, [id, link]);
    res.status(200).json({ error: false, id });
});

app.get('*', (req, res) => {
    res.status(404).send(`Not found "${ req.path }"`);
});

app.post('*', (req, res) => {
    res.status(404).send(`Not found "${ req.path }"`);
});
