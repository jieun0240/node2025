const express = require('express');
const router = express.Router();

// 라우팅 / 메서드, 경로
router.get("/", (req, res) => {
  res.send("get swag");
});

router.post("/", (req, res) => {
  res.send(req.body);
});

router.post("/:person", (req, res) => {
  res.send(req.params.person);
});

module.exports = router;