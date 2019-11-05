import "module-alias/register";

/* eslint-disable @typescript-eslint/camelcase */

import bodyParser from "body-parser";
import config from "config";
import coViews from "co-views";
import express from "express";
import util from "util";

import database from "@/database";
import Logger from "@util/logger";
import oauth2Server from "@middleware/oauth";

const app = express();
const render = coViews("views");
// app.set("view engine", "ejs");

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.post("/oauth/token", oauth2Server.token());

app.get("/oauth/authorize", (req, res) => {
  // Redirect anonymous users to login page.
  if (!req.app.locals.user) {
    return res.redirect(
      util.format(
        "/login?redirect=%s&client_id=%s&redirect_uri=%s",
        req.path,
        req.query.client_id,
        req.query.redirect_uri,
      ),
    );
  }

  return render("authorize", {
    client_id: req.query.client_id,
    redirect_uri: req.query.redirect_uri,
  });
});

app.post("/oauth/authorize", (req, res) => {
  // Redirect anonymous users to login page.
  if (!req.app.locals.user) {
    return res.redirect(
      util.format("/login?client_id=%s&redirect_uri=%s", req.query.client_id, req.query.redirect_uri),
    );
  }

  return oauth2Server.authorize();
});

app.get("/login", req => {
  return render("login", {
    redirect: req.query.redirect,
    client_id: req.query.client_id,
    redirect_uri: req.query.redirect_uri,
  });
});

app.post("/login", (req, res) => {
  // @TODO: Insert your own login mechanism.
  if (req.body.email !== "nommo_bd1@tlen.pl") {
    return render("login", {
      redirect: req.body.redirect,
      client_id: req.body.client_id,
      redirect_uri: req.body.redirect_uri,
    });
  }

  // Successful logins should send the user back to /oauth/authorize.
  const path = req.body.redirect || "/home";

  // TODO: After successful login redirect to the URL from Database

  return res.redirect(
    util.format("/%s?client_id=%s&redirect_uri=%s", path, req.query.client_id, req.query.redirect_uri),
  );
});

app.listen(config.get("oauth.port"), async err => {
  if (err) {
    Logger.log("error", "App error", { message: err });
    return;
  }
  await database.sync({ force: false });
  Logger.log("info", `App is running at 0.0.0.0:${config.get("oauth.port")}`);
});
