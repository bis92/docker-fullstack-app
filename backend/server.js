const express = require('express');
const bodyParser = require('body-parser');

const db = require('./db');

const app = express();

app.use(bodyParser.json());

// db.pool.query(`CREATE TABLE lists (
//     id INTEGER AUTO_INCREMENT,
//     value TEXT,
//     PRIMARY KEY (id)
// )`, (err, results, fields) => {
//     console.log('results', results)
// });

//DB lists 테이블에 있는 모든 데이터를 프론트엔드 서버에 보내주기
app.get('/api/values', function(req, res) {
    db.pool.query('SELECT * FROM lists;',
        (err, results, fields) => {
            if (err) {
                return res.status(500).send(err);
            } else {
                return res.json(results)
            }
        })
})

app.post('/api/value', function (req, res, next){
    db.pool.query(`INSERT INTO lists (value) VALUES("${req.body.value}")`, (err, results, fields) => {
        if(err){
            return res.status(500).send(err)
        } else {
            return res.json({ success: true, value: req.body.value })
        }
    })
})

const port = process.env.PORT || 5000;

app.listen(port, () => {
    console.log(`Server Running at port:${port}`)
})