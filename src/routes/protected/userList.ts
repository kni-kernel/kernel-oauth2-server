import { Router } from "express";

import UserService from "@services/UserService";

import { RequestOverride } from "ExpressOverride";
import UserGetOptions from "UserGetOptions";

const router = Router();

router.get("/dashboard/user/list", async (req: RequestOverride, res) => {
  let opts: UserGetOptions = undefined;

  if (req.user.privilege === Privilege.Foreman) {
    opts = {
      beginningYear: req.user.beginningYear,
      fieldOfStudy: req.user.fieldOfStudy,
    };
  }

  try {
    return res.render("userList", { user: req.user, users: await UserService.getUsers(opts) });
  } catch (err) {
    return res.render("error", { user: req.user, error: err });
  }
});

export default router;
