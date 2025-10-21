import { Router } from "express";
import { userController } from "./user.controller.js";

const router: Router = Router();

/**
 * @swagger
 * /api/v1/users/register:
 *   post:
 *     summary: Create a new user
 *     tags:
 *       - Users
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *                 format: email
 *               password:
 *                 type: string
 *                 format: password
 *     responses:
 *       200:
 *         description: Successfully created user
 */
router.route("/register").post(userController.register);

/**
 * @swagger
 * /api/v1/users/login:
 *   post:
 *     summary: Login user
 *     tags:
 *       - Users
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *                 format: email
 *               password:
 *                 type: string
 *                 format: password
 */
router.route("/login").post(userController.login);

/**
 * @swagger
 * /api/v1/users/get-all-users:
 *   get:
 *     summary: Get all users
 *     tags:
 *       - Users
 *     responses:
 *       200:
 *         description: Successfully retrieved users
 */
router.route("/get-all-users").get(userController.getAllUsers);

/**
 * @swagger
 * /api/v1/users/remove-user:
 *   delete:
 *     summary: Remove user
 *     tags:
 *       - Users
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               userId:
 *                 type: string
 */
router.route("/remove-user").delete(userController.removeUser);

export default router;
