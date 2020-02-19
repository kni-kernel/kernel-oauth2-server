import { Router } from "express";
import passport from "passport";

import csrf from "@util/csrf";

const router = Router();

router.get("/", csrf, (req, res) => {
  return res.render("authorize", {
    action: "/login",
    // eslint-disable-next-line @typescript-eslint/ban-ts-ignore
    // @ts-ignore
    csrf: req.csrfToken(),
    isOauth: false,
  });
});

router.post(
  "/login",
  csrf,
  passport.authenticate("local", {
    successRedirect: "/dashboard",
    failureRedirect: "/",
  }),
);

export default router;
