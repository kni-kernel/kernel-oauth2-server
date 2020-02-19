import { Router } from "express";
import { check } from "express-validator";
import passport from "passport";

import csrf from "@util/csrf";

import { RequestOverride } from "ExpressOverride";

const router = Router();

router.get("/", csrf, (req: RequestOverride, res) => {
  return res.render("authorize", {
    action: "/login",
    csrf: req.csrfToken(),
    isOauth: false,
  });
});

router.post(
  "/login",
  csrf,
  [check("username").notEmpty(), check("password").notEmpty()],
  passport.authenticate("local", {
    successRedirect: "/dashboard",
    failureRedirect: "/",
  }),
);

export default router;
