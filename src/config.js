require("dotenv").config();

// Configuración de la aplicación
module.exports = {
  app: {
    port: process.env.PORT || 3000,
  },
  jwt: {
    secret: process.env.JWT_SECRET || "",
    expireIn: process.env.JWT_EXPIRE_IN || "1h",
  },
  mysql: {
    host: process.env.MYSQL_HOST || "localhost",
    user: process.env.MYSQL_USER || "root",
    password: process.env.MYSQL_PASSWORD || "",
    database: process.env.MYSQL_DB || "generalapi",
    port: process.env.MYSQL_PORT || 3306,
    dialect: process.env.MYSQL_DIALECT || "mysql",
  },
  redis: {
    host: process.env.REDIS_HOST || "localhost",
    port: process.env.REDIS_PORT || 6379,
  },
  email: {
    user: process.env.EMAIL_USER || "mephisto0130@gmail.com",
    password: process.env.EMAIL_PASS || "ejor xuck tprp homw",
  },
  apiKey: process.env.API_KEY,
  CORS_ORIGIN: process.env.CORS_ORIGIN || '*',
};
