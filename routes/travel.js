const express = require('express');
const router = express.Router();
const db = require('../db');

// 전체 게시글 목록 페이지
router.get('/', (req, res) => {
    const _query = 'SELECT * FROM travellist';
    db.query(_query, (err, results) => {
        if (err) return res.status(500).send('Internal Server Error');
        res.render('travel', { travelList: results });
    });
});

// 여행지 추가하는 페이지
router.get('/add', (req, res) => {
    res.render('addTravel');
});

// 게시한 여행지 내용 읽기
router.get('/:id', (req, res) => {
    const travelId = req.params.id;
    const _query = 'SELECT * FROM travellist WHERE id = ?';
    db.query(_query, [travelId], (err, results) => {
        if (err) return res.status(500).send('Internal Server Error');
        res.render('travelDetail', { travel: results[0] });
    });
});

// 게시글 수정 페이지
router.get('/:id/edit', (req, res) => {
    const travelId = req.params.id;
    const _query = 'SELECT * FROM travellist WHERE id = ?';
    db.query(_query, [travelId], (err, results) => {
        if (err) return res.status(500).send('Internal Server Error');
        res.render('editTravel', { travel: results[0] });
    });
});

// 게시글 수정
router.put('/:id', (req, res) => {
    const travelId = req.params.id;
    const { name } = req.body;
    const _query = 'UPDATE travellist SET name = ? WHERE id = ?';
    db.query(_query, [name, travelId], (err) => {
        if (err) return res.status(500).send('Internal Server Error');
        res.render('updateSuccess');
    });
});

router.post('/', (req, res) => {
    const { name } = req.body;
    const _query = 'INSERT INTO travellist (name) VALUES (?)';
    db.query(_query, [name], (err) => {
        if (err) {
            console.error('쿼리 실패', err);
            return res.status(500).send('Internal Server Error');
        }
        res.redirect('/travel');
    });
});

// 삭제
router.delete('/:id', (req, res) => {
    const travelId = req.params.id;
    const _query = 'DELETE FROM travellist WHERE id = ?';
    db.query(_query, [travelId], (err) => {
        if (err) return res.status(500).send('Internal Server Error');
        res.render('deleteSuccess');
    });
});

module.exports = router;
