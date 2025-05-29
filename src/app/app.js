const express = require("express");
const helmet = require('helmet');
const morgan = require("morgan");
const config = require("../config");
const cors = require("cors");
const path = require("path");
const swaggerUi = require('swagger-ui-express');
const swaggerSpec = require('../config/swagger');

const roles = require("../routes/role.routes");
const users = require("../routes/user.routes");
const posts = require("../routes/post.routes");
const likes = require("../routes/like.routes");
const comments = require("../routes/comment.routes");
const auth = require("../routes/auth.routes");
const errorHandler = require("../middlewares/errorHandler");

const app = express();

//middlewares
app.use(morgan("dev"));

app.use(helmet({
  contentSecurityPolicy: {
    directives: {
      defaultSrc: ["'self'"],
      imgSrc: ["'self'", 'http://localhost:4200', 'data:', 'https://cdn.jsdelivr.net'],
      scriptSrc: ["'self'", "'unsafe-inline'", 'https://cdn.jsdelivr.net'],
      styleSrc: ["'self'", "'unsafe-inline'", 'https://cdn.jsdelivr.net'],
    },
  },
  crossOriginEmbedderPolicy: false,
  crossOriginResourcePolicy: false,
}));
app.use(cors({
  origin: process.env.CORS_ORIGIN || '*',
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

// Swagger Documentation
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec, {
  explorer: true,
  customCssUrl: 'https://cdn.jsdelivr.net/npm/swagger-ui-themes@3.0.0/themes/3.x/theme-material.css'
}));

//endpoint not found
app.use((req, res, next) => {
  res.status(404).json({
    message: "Endpoint not found",
  });
});

module.exports = app;
