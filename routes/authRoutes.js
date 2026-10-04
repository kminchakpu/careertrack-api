const express = require("express");
const router = express.Router();
const passport = require("../config/passport");


router.get("/", (req, res) => {
  res.status(200).json({
    message: "CareerTrack authentication",
  });
});

router.get(
  "/google",
  passport.authenticate("google", {
    scope: ["profile", "email"],
  })
);

router.get(
  "/google/callback",
  passport.authenticate("google", {
    failureRedirect: "/auth",
  }),
  (req, res) => {
    res.status(200).json({
      message: "Successfully authenticated with Google",
      user: req.user,
    });
  }
);

router.get("/logout", (req, res, next) => {
  req.logout((error) => {
    if (error) {
      return next(error);
    }

    req.session.destroy((error) => {
      if (error) {
        return next(error);
      }

      res.status(200).json({
        message: "Successfully logged out",
      });
    });
  });
});

module.exports = router;