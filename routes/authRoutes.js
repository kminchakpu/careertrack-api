const express = require("express");
const router = express.Router();
router.get("/", (req, res) => {
  //#swagger.tags=['Auth']
  res.status(200).json({
    message: "CareerTrack authentication",
  });
});
module.exports = router;