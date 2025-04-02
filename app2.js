const express = require('express');
const mysql = require('mysql2');
const path = require('path');
const dotenv = require('dotenv');
dotenv.config();

const app = express();
const port = 2027;

const db = mysql.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME
});

db.connect(err => {
    if(err) {
        console.error('MySQL 연결 실패 : ', err);
        return;
    }
    console.log('MySQL 연결 성공');
});

app.set('view engine', 'ejs');

// __dirname = 현재 파일이 속해있는 디렉토리의 절대경로
// path.join을 사용하여 운영체제의 맞추어 경로 지정자를 설정
app.set('views', path.join(__dirname, 'views'));

app.get('/travel', (req, res) => {
    const _query = 'SELECT * FROM travellist';
    db.query(_query, (err, results) => {
        if(err) {
            console.error('데이터베이스 쿼리 실패', err);
            res.status(500).send('Internal Server Error');
            return;
        }
        const travelList = results;
        res.render('travel', {travelList});
    });
});

app.listen(port, () => {
    console.log(`서버가 http://localhost:${port}/swag 에서 실행 중입니다.`);
});