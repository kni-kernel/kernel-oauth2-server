import { Router } from "express";

import { isAuthenticated, isAuthenticatedAsForeman, isAuthenticatedAsAdmin } from "@middleware/auth";

import dashboardRoutes from "@routes/protected/dashboard";

const router = Router();

// Routes which need normal authentication
router.use(isAuthenticated);
router.use(dashboardRoutes);

// Routes which need foreman / admin authentication
router.use(isAuthenticatedAsForeman);

// Routes which need admin authentication
router.use(isAuthenticatedAsAdmin);

export default router;
