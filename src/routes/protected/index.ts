import { Router } from "express";

import { isAuthenticated, isAuthenticatedAsForeman, isAuthenticatedAsAdmin } from "@middleware/auth";

import dashboardRoutes from "@routes/protected/dashboard";
import userAddRoutes from "@routes/protected/userAdd";
import userEditRoutes from "@routes/protected/userEdit";
import userChangeRoutes from "@routes/protected/userChange";
import userListRoutes from "@routes/protected/userList";

const router = Router();

// Routes which need normal authentication
router.use(isAuthenticated);
router.use(dashboardRoutes);
router.use(userChangeRoutes);

// Routes which need foreman / admin authentication
router.use(isAuthenticatedAsForeman);
router.use(userAddRoutes);
router.use(userEditRoutes);
router.use(userListRoutes);

// Routes which need admin authentication
router.use(isAuthenticatedAsAdmin);

export default router;
