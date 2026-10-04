require("dotenv").config();

const express = require("express");
const cors = require("cors");
const session = require("express-session");
const swaggerUi = require("swagger-ui-express");
const passport = require("./config/passport");

const applicationsRoutes = require("./routes/applicationsRoutes");
const companiesRoutes = require("./routes/companiesRoutes");
const interviewsRoutes = require("./routes/interviewsRoutes");
const usersRoutes = require("./routes/usersRoutes");
const authRoutes = require("./routes/authRoutes");

const errorMiddleware = require("./middleware/errorMiddleware");

const app = express();

if (process.env.NODE_ENV === "production") {
  app.set("trust proxy", 1);
}

app.use(
  cors({
    origin: true,
    credentials: true,
  })
);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(
  session({
    secret:
      process.env.SESSION_SECRET ||
      "careertrack-development-secret",
    resave: false,
    saveUninitialized: false,
    cookie: {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      maxAge: 24 * 60 * 60 * 1000,
    },
  })
);

app.use(passport.initialize());
app.use(passport.session());

app.get("/", (req, res) => {
  res.status(200).json({
    message: "Welcome to the CareerTrack API",
    documentation: "/api-docs",
    authentication: "/auth/google",
  });
});

app.use("/auth", authRoutes);
app.use("/api/applications", applicationsRoutes);
app.use("/api/companies", companiesRoutes);
app.use("/api/interviews", interviewsRoutes);
app.use("/api/users", usersRoutes);

try {
  const swaggerDocument = require("./swagger-output.json");

  app.use(
    "/api-docs",
    swaggerUi.serve,
    swaggerUi.setup(swaggerDocument)
  );
} catch (error) {
  console.error(
    "Swagger documentation has not been generated yet.",
    error.message
  );
  console.log(
    "Run npm run swagger to generate the Swagger documentation."
  );
}

app.use((req, res) => {
  res.status(404).json({
    error: "Route not found",
  });
});

app.use(errorMiddleware);

module.exports = app;