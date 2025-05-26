const express = require("express");
const helmet = require('helmet');
const morgan = require("morgan");
const config = require("../config");
const cors = require("cors");
const path = require("path");

const roles = require("../routes/role.routes");
const users = require("../routes/user.routes");
const posts = require("../routes/post.routes");
const likes = require("../routes/like.routes");
const comments = require("../routes/coment.routes");
const auth = require("../routes/auth.routes");
const errorHandler = require("../middlewares/errorHandler");

const app = express();

//middlewares
app.use(morgan("dev"));

app.use(helmet({
  contentSecurityPolicy: {
    directives: {
      defaultSrc: ["'self'"],
      imgSrc: ["'self'", 'http://localhost:4200', 'data:'],
      scriptSrc: ["'self'"],
      styleSrc: ["'self'", "'unsafe-inline'"],
    },
  },
  crossOriginEmbedderPolicy: false,
  crossOriginResourcePolicy: false,
}));
app.use(cors({
  allowedOrigins: [config.app.CORS_ORIGIN],
  methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE'],
  credentials: false,
}));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

//configuracion
app.set("port", config.app.port);

//rutas
app.use("/api/roles", roles);
app.use("/api/users", users);
app.use("/api/posts", posts);
app.use("/api/likes", likes);
app.use("/api/comments", comments);
app.use("/api/auth", auth);
app.use(errorHandler);

// public static files
app.use(express.static(path.join(__dirname, "../../uploads")));

//endpoint not found
app.use((req, res, next) => {
  res.status(404).json({
    message: "Endpoint not found",
  });
});

module.exports = app;
