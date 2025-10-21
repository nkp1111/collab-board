import { HttpStatusCodes as Code } from "../../utils/enums.utils.js";
import { comparePassword, hashPassword } from "../../utils/pwdEncrypt.utils.js";
import { GenResponseFormat } from "../../utils/response-format.utils.js";
import {
  createUser,
  deleteUserById,
  findUserByEmail,
  getAllUserFromDb,
} from "./user.helper.js";
import { userRegisterType } from "./user.validate.js";

export const register = async (payload: userRegisterType) => {
  try {
    const { email, name, password } = payload;

    const userExists = await findUserByEmail(email);
    if (userExists.length > 0) {
      return GenResponseFormat(
        Code.CONFLICT,
        false,
        "User already exists",
        null
      );
    }

    const encryptedPassword = await hashPassword(password);

    // Create new user logic
    const user = await createUser({ email, password: encryptedPassword, name });

    return GenResponseFormat(
      Code.CREATED,
      true,
      "User registered successfully",
      null
    );
  } catch (error) {
    console.log("Error in user registration:", error);
    throw error;
  }
};

export const login = async (payload: any) => {
  try {
    const { email, password } = payload;

    const userExists = await findUserByEmail(email);
    if (userExists.length == 0) {
      return GenResponseFormat(Code.NOT_FOUND, false, "User not found", null);
    }

    const passwordMatch = await comparePassword(
      password,
      userExists[0].password
    );
    if (!passwordMatch) {
      return GenResponseFormat(
        Code.UNAUTHORIZED,
        false,
        "Invalid credentials",
        null
      );
    }

    return GenResponseFormat(
      Code.OK,
      true,
      "User logged in successfully",
      userExists[0]
    );
  } catch (error) {
    console.log("Error in user login:", error);
    throw error;
  }
};

export const getAllUsers = async () => {
  try {
    const users = await getAllUserFromDb();
    return GenResponseFormat(
      Code.OK,
      true,
      "Users fetched successfully",
      users
    );
  } catch (error) {
    console.log("Error in getting all users:", error);
    throw error;
  }
};

export const removeUser = async (payload: any) => {
  try {
    const { userId } = payload;

    await deleteUserById(userId);

    return GenResponseFormat(Code.OK, true, "User deleted successfully", null);
  } catch (error) {
    console.log("Error in remove user:", error);
    throw error;
  }
};
