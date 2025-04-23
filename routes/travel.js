const express = require('express');
const Travel = require('../models/Travel');
const router = express.Router();

// 여행 목록 조회
router.get('/', async (req, res) => {
    try {
        const travelList = await Travel.findAll();
        res.render('travel', { travelList });
    } catch (err) {
        console.error('데이터베이스 쿼리 실패:', err);
        res.status(500).send('Internal Server Error');
    }
});

// 여행 추가 폼
router.get('/add', (req, res) => {
    res.render('addTravel');
});

// 여행 추가
router.post('/', async (req, res) => {
    const { name } = req.body;
    try {
        await Travel.create({ name });
        res.redirect('/travel');
    } catch (err) {
        console.error('데이터베이스 쿼리 실패:', err);
        res.status(500).send('Internal Server Error');
    }
});

// 여행 상세 조회
router.get('/:id', async (req, res) => {
    try {
        const travel = await Travel.findByPk(req.params.id);
        if (!travel) return res.status(404).send('여행지를 찾을 수 없습니다');
        res.render('travelDetail', { travel });
    } catch (err) {
        console.error('데이터베이스 쿼리 실패:', err);
        res.status(500).send('Internal Server Error');
    }
});

// 여행 수정 폼
router.get('/:id/edit', async (req, res) => {
    try {
        const travel = await Travel.findByPk(req.params.id);
        if (!travel) return res.status(404).send('여행지를 찾을 수 없습니다');
        res.render('editTravel', { travel });
    } catch (err) {
        console.error('데이터베이스 쿼리 실패:', err);
        res.status(500).send('Internal Server Error');
    }
});

// 여행 수정
router.put('/:id', async (req, res) => {
    const { name } = req.body;
    try {
        const travel = await Travel.findByPk(req.params.id);
        if (!travel) return res.status(404).send('여행지를 찾을 수 없습니다');
        await travel.update({ name });
        res.render('updateSuccess');
    } catch (err) {
        console.error('DB 쿼리 실패:', err);
        res.status(500).send('DB 서버 에러');
    }
});

// 여행 삭제
router.delete('/:id', async (req, res) => {
    try {
        const travel = await Travel.findByPk(req.params.id);
        if (!travel) return res.status(404).send('여행지를 찾을 수 없습니다');
        await travel.destroy();
        res.render('deleteSuccess');
    } catch (err) {
        console.error('DB 쿼리 실패:', err);
        res.status(500).send('DB 서버 에러');
    }
});

module.exports = router;
