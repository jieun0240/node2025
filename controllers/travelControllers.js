const Travel = require("../models/Travel");

const travelController = {
  // 여행지 리스트 페이지
  getTravelList: async (req, res) => {
    try {
      const travelList = await Travel.findAll();
      res.render("travel", { travelList });
    } catch (err) {
      console.error("데이터베이스 쿼리 실패: ", err);
      res.status(500).send("Internal Server Error");
    }
  },

  // 여행지 추가 페이지
  getAddTravelForm: (req, res) => {
    res.render("addTravel");
  },

  // 여행지 추가 처리
  addTravel: async (req, res) => {
    const { name } = req.body;
    try {
      await Travel.create({ name });
      res.redirect("/travel");
    } catch (err) {
      console.error("데이터베이스 쿼리 실패: ", err);
      res.status(500).send("Internal Server Error");
    }
  },

  // 여행지 상세 페이지
  getTravelDetail: async (req, res) => {
    const travelId = req.params.id;
    try {
      const travel = await Travel.findByPk(travelId);
      if (!travel) {
        res.status(404).send("게시글이 존재하지 않습니다.");
        return;
      }
      res.render("travelDetail", { travel });
    } catch (err) {
      console.error("데이터베이스 쿼리 실패: ", err);
      res.status(500).send("Internal Server Error");
    }
  },

  // 여행지 수정 페이지
  getEditTravelForm: async (req, res) => {
    const travelId = req.params.id;
    try {
      const travel = await Travel.findByPk(travelId);
      if (!travel) {
        res.status(404).send("게시글이 존재하지 않습니다.");
        return;
      }
      res.render("editTravel", { travel });
    } catch (err) {
      console.error("데이터베이스 쿼리 실패: ", err);
      res.status(500).send("Internal Server Error");
    }
  },

  // 여행지 수정 처리
  updateTravel: async (req, res) => {
    const travelId = req.params.id;
    const { name } = req.body;
    try {
      const travel = await Travel.findByPk(travelId);
      if (!travel) {
        res.status(404).send("게시글이 존재하지 않습니다.");
        return;
      }
      await travel.update({ name });
      res.redirect("/travel");
    } catch (err) {
      console.error("데이터베이스 쿼리 실패: ", err);
      res.status(500).send("Internal Server Error");
    }
  },

  // 여행지 삭제 처리
  deleteTravel: async (req, res) => {
    const travelId = req.params.id;
    try {
      const travel = await Travel.findByPk(travelId);
      if (!travel) {
        res.status(404).send("게시글이 존재하지 않습니다.");
        return;
      }
      await travel.destroy();
      res.redirect("/travel");
    } catch (err) {
      console.error("데이터베이스 쿼리 실패: ", err);
      res.status(500).send("Internal Server Error");
    }
  }
};

module.exports = travelController;
