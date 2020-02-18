import "module-alias/register";

/* eslint-disable @typescript-eslint/camelcase */

import bodyParser from "body-parser";
import cookieParser from "cookie-parser";
import config from "config";
import csrf from "csurf";
import express from "express";

import database from "@/database";
import Logger from "@util/logger";
import oauth2Server from "@middleware/oauth";
import UserService from "@services/UserService";

const app = express();

const csrfProtection = csrf({
  cookie: true,
  value: req => req.body.state,
});

app.set("view engine", "ejs");

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());

app.post("/oauth/token", oauth2Server.token());

app.get("/oauth/authorize", csrfProtection, (req, res) => {
  return res.render("authorize", {
    // eslint-disable-next-line @typescript-eslint/ban-ts-ignore
    // @ts-ignore
    csrf: req.csrfToken(),
    redirect: req.query.redirect ? req.query.redirect : true,
    client_id: req.query.client_id ? req.query.client_id : "oauth-server",
    redirect_uri: req.query.redirect_uri ? req.query.redirect_uri : "http://localhost:5000/dashboard",
    response_type: "code",
  });
});

app.post(
  "/oauth/authorize",
  csrfProtection,
  async (req, res, next) => {
    try {
      const user = await UserService.getUserByLoginAndPassword(req.body.username, req.body.password);

      if (!user) {
        return res.render("authorize", {
          // eslint-disable-next-line @typescript-eslint/ban-ts-ignore
          // @ts-ignore
          csrf: req.csrfToken(),
          redirect: req.body.redirect,
          client_id: req.body.client_id,
          redirect_uri: req.body.redirect_uri,
          response_type: "code",
        });
      }

      req.body.user = user.toJSON();
      return next();
    } catch (err) {
      Logger.log("error", "Error while POST /oauth/authorize", { err });
      return res.status(500).send();
    }
  },
  oauth2Server.authorize({
    authenticateHandler: {
      // eslint-disable-next-line @typescript-eslint/explicit-function-return-type
      handle: req => {
        return req.body.user;
      },
    },
  }),
);

app.get("/oauth/me", oauth2Server.authenticate(), (req, res) => {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { id, password, ...rest } = res.locals.oauth.token.user;
  return res.json(rest);
});

app.listen(config.get("oauth.port"), async err => {
  if (err) {
    Logger.log("error", "App error", { message: err });
    return;
  }
  await database.sync({ force: false });
  Logger.log("info", `App is running at 0.0.0.0:${config.get("oauth.port")}`);
});
