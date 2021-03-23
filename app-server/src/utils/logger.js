const config = require("config");
const _ = require("lodash");

const logger = require("pino")();

logger.level = logger.levels.values[config.server.log.level];

logger.expressLog = (req, res, next) => {
  // const langs = HttpUtils.parseAcceptLanguages(req);
  // const { user } = req.session;
  logger.debug(
    {
      http: {
        ip: req.headers["x-forwarded-for"] || req.ip,
        ..._.pick(req, [
          "remoteAddress",
          "method",
          "hostname",
          "originalUrl",
          "query",
          "body",
        ]),
      },
      //   user: _.pick(user, ["uid", "loginid"]),
    },
    "REQ"
  );
  next();
};

module.exports = logger;
