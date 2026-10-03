const express = require("express");
const passport = require("../config/passport");

const router = express.Router();

router.get(
  "/google",
  /*
    #swagger.tags = ["Authentication"]
    #swagger.summary = "Sign in with Google"
    #swagger.description = "Starts the Google OAuth 2.0 authentication flow."

    #swagger.responses[302] = {
      description: "Redirects the user to Google for authentication"
    }
  */
  passport.authenticate("google", {
    scope: ["profile", "email"],
  })
);

router.get(
  "/google/callback",
  /*
    #swagger.tags = ["Authentication"]
    #swagger.summary = "Google OAuth callback"
    #swagger.description = "Handles the response returned by Google after authentication."

    #swagger.responses[302] = {
      description: "Authentication successful and user redirected"
    }

    #swagger.responses[401] = {
      description: "Google authentication failed"
    }
  */
  passport.authenticate("google", {
    failureRedirect: "/auth/failure",
  }),
  (req, res) => {
    res.redirect("/auth/profile");
  }
);

router.get(
  "/profile",
  /*
    #swagger.tags = ["Authentication"]
    #swagger.summary = "Get authenticated user profile"
    #swagger.description = "Returns the currently authenticated CareerTrack user."

    #swagger.security = [{
      "sessionAuth": []
    }]

    #swagger.responses[200] = {
      description: "Authenticated user returned successfully"
    }

    #swagger.responses[401] = {
      description: "User is not authenticated"
    }
  */
  (req, res) => {
    if (!req.isAuthenticated()) {
      return res.status(401).json({
        error: "Not authenticated",
      });
    }

    res.status(200).json({
      message: "User authenticated successfully",
      user: req.user,
    });
  }
);

router.get(
  "/status",
  /*
    #swagger.tags = ["Authentication"]
    #swagger.summary = "Check authentication status"

    #swagger.responses[200] = {
      description: "Authentication status returned successfully"
    }
  */
  (req, res) => {
    if (req.isAuthenticated()) {
      return res.status(200).json({
        authenticated: true,
        user: req.user,
      });
    }

    res.status(200).json({
      authenticated: false,
      user: null,
    });
  }
);

router.get(
  "/failure",
  /*
    #swagger.tags = ["Authentication"]
    #swagger.summary = "Google authentication failure"

    #swagger.responses[401] = {
      description: "Google authentication failed"
    }
  */
  (req, res) => {
    res.status(401).json({
      error: "Google authentication failed",
    });
  }
);

router.get(
  "/logout",
  /*
    #swagger.tags = ["Authentication"]
    #swagger.summary = "Log out the current user"
    #swagger.description = "Ends the authenticated Passport session."

    #swagger.security = [{
      "sessionAuth": []
    }]

    #swagger.responses[200] = {
      description: "User logged out successfully"
    }

    #swagger.responses[500] = {
      description: "Logout failed"
    }
  */
  (req, res, next) => {
    req.logout((error) => {
      if (error) {
        return next(error);
      }

      req.session.destroy((sessionError) => {
        if (sessionError) {
          return next(sessionError);
        }

        res.clearCookie("connect.sid");

        res.status(200).json({
          message: "Logged out successfully",
        });
      });
    });
  }
);

module.exports = router;