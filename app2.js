const express = require('express');
const path = require('path');
const mysql = require('mysql2');
const dotenv = require('dotenv');
const methodOverride = require('method-override');
dotenv.config();

const app = express();
const port = 2007;

const db = mysql.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    port: process.env.DB_PORT
});


db.connect(err => {
    if (err) {
        console.error('MySQL 연결 실패 : ', err);
        return;
    }
    console.log('MySQL 연결 성공!!');
});


app.use(methodOverride('_method'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.set('view engine', 'ejs');

// __dirname : 현재 파일이 속해있는 디렉토리의 절대 경로
//path.join : 운영체제에 맞추어 경로지정자(/ 혹은 \)를 설정해 준다.
app.set('views', path.join(__dirname, 'views'));

// 두 개의 결괏값이 같다.
console.log(path.join(__dirname, 'views'));
// console.log(__dirname + '\\views');

app.get('/travel', (req, res) => {
    const _query = 'SELECT * FROM travellist';
    db.query(_query, (err, results) => {
        if (err) {
            console.error('데이터베이스 쿼리 실패 : ', err);
            res.status(500).send('Internal Server Error');
            return;
        }
        const travelList = results;
        res.render('travel', { travelList });
    });
});


app.get('/travel/:id', (req, res) => {
    const travelId = req.params.id;
    const _query = 'SELECT * FROM travellist WHERE id = ?';
    db.query(_query, [travelId], (err, results) => {
        if (err) {
            console.error('데이터베이스 쿼리 실패 : ', err);
            res.status(500).send('Internal Server Error');
            return;
        }
        const travel = results[0];
        res.render('travelDetail', { travel });
    });
});


app.post('/travel', (req, res) => {
    const { name } = req.body;
    const _query = 'INSERT INTO travellist (name) VALUES (?)';
    db.query(_query, [name], (err, results) => {
        if (err) {
            console.error('데이터베이스 쿼리 실패 : ', err);
            res.status(500).send('Internal Server Error');
            return; 
        }
        res.redirect('/travel');
    });
});


app.get('/add-travel', (req, res) => {
    res.render('addTravel');
});


app.put('/travel/:id', (req, res) => {
    const travelId = req.params.id;
    const {name} = req.body;
    const _query = 'UPDATE travellist SET name = ? WHERE id = ?';
    db.query(_query, [name, travelId], (err, results) => {
        if (err) {
            console.error('데이터베이스 쿼리 실패 : ', err);
            res.status(500).send('Internal Server Error');
            return;
        }
        res.render('updateSuccess');
    });
});


app.get('/travel/:id/edit', (req, res) => {
    const travelId = req.params.id;
    const _query = 'SELECT * FROM travellist WHERE id = ?';
    db.query(_query, [travelId], (err, results) => {
        if (err) {
            console.error('데이터베이스 쿼리 실패 : ', err);
            res.status(500).send('Internal Server Error');
            return;
        }
        const travel = results[0];
        res.render('editTravel', { travel });
    });
});


app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}/`);
});