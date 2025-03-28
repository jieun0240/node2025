const express = require('express');

const path = require('path');

const app = express();
const port = 2027;
app.set('view engine', 'ejs');

// __dirname = 현재 파일이 속해있는 디렉토리의 절대경로
// path.join을 사용하여 운영체제의 맞추어 경로 지정자를 설정
app.set('views', path.join(__dirname, 'views'));

const travelList = ['뉴욕', '파리', '우리집', '도쿄'];

app.get('/travel', (req, res) => {
    res.render('travel', {travelList});
});

app.listen(port, () => {
    console.log(`서버가 http://localhost:${port}/swag 에서 실행 중입니다.`);
  });