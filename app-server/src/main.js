const config = require("config");
const _ = require("lodash");
const logger = require("./utils/logger");

const express = require("express");
const helmet = require("helmet");
const cors = require("cors");

const Stopwatch = require("statman-stopwatch");
const stopwatch = new Stopwatch(true);
logger.info("starting...");

const app = express();

app.use(helmet());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(
  cors({
    origin: ["http://localhost:8080"],
    credentials: true,
  })
);

app.use(logger.expressLog);

app.get("/healthcheck", (req, res) => {
  res.send("ok");
});

app.use("/api/users", require("./api/users"));

const { port } = config.server;
app.listen(port, () => {
  logger.info({ port }, "server listening");

  stopwatch.stop();
  logger.info(`server started in ${stopwatch.time(0)}ms`);
});
