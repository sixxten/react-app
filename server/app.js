const express = require("express");
const config = require("config");
const cookieParser = require("cookie-parser");
const cors = require("cors");
const path = require("path");

const router = require("./routes");
const sequelize = require("./db");

require("./models");

const PORT = config.get("port");
const app = express();

app.use("/uploads", express.static(path.join(__dirname, "uploads")));

app.use(express.json());
app.use(cookieParser());

app.use(
  cors({
    origin: config.get("clientUrl"),
    credentials: true,
  })
);

app.use("/api", router);

async function start() {
  try {
    await sequelize.authenticate();
    await sequelize.sync();
    console.log("Database is working!");
    app.listen(PORT, () => console.log(`Backend started on ${PORT}`));
  } catch (e) {
    console.error("Server error:", e);
    console.error("Message:", e?.message);
    console.error("Stack:", e?.stack);
    process.exit(1);
  }
}

start();

module.exports = { app };
