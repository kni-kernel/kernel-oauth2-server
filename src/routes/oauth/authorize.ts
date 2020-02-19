import { Router } from "express";

import oauth2Server from "@middleware/oauth";
import UserService from "@services/UserService";
import Logger from "@util/logger";

const router = Router();

router.get("/authorize", (req, res) => {
  return res.render("authorize", {
    action: "/oauth/authorize",
    // eslint-disable-next-line @typescript-eslint/ban-ts-ignore
    // @ts-ignore
    csrf: req.query.state,
    redirect: req.query.redirect,
    clientId: req.query.client_id,
    redirectUri: req.query.redirect_uri,
    responseType: "code",
    isOauth: true,
  });
});

router.post(
  "/authorize",
  async (req, res, next) => {
    try {
      const user = await UserService.getUserByLoginAndPassword(req.body.username, req.body.password);

      if (!user) {
        return res.render("authorize", {
          action: "/oauth/authorize",
          // eslint-disable-next-line @typescript-eslint/ban-ts-ignore
          // @ts-ignore
          csrf: req.body.state,
          redirect: req.body.redirect,
          clientId: req.body.client_id,
          redirectUri: req.body.redirect_uri,
          responseType: "code",
          isOauth: true,
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

export default router;
