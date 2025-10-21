import { Router } from "express";

import UserRoutes from "./user/user.route.js";

const router: Router = Router();

router.use("/users", UserRoutes);

export default router;
