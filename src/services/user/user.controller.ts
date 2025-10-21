import { Request, Response } from "express";
import * as UserProvider from "./user.provider.js";
import { userRegisterValidator } from "./user.validate.js";

export const userController = {
  register: async (req: Request, res: Response) => {
    try {
      const payload = {
        ...req.body,
      };

      userRegisterValidator.assert(payload);

      const response = await UserProvider.register(payload);
      res.status(response.code).json(response);
    } catch (error) {
      throw error;
    }
  },

  login: async (req: Request, res: Response) => {
    try {
      const payload = {
        ...req.body,
      };

      const response = await UserProvider.login(payload);
      res.status(response.code).json(response);
    } catch (error) {
      throw error;
    }
  },

  getAllUsers: async (req: Request, res: Response) => {
    try {
      const response = await UserProvider.getAllUsers();
      res.status(response.code).json(response);
    } catch (error) {
      throw error;
    }
  },

  removeUser: async (req: Request, res: Response) => {
    try {
      const payload = {
        ...req.body,
      };

      const response = await UserProvider.removeUser(payload);
      res.status(response.code).json(response);
    } catch (error) {
      throw error;
    }
  },
};
