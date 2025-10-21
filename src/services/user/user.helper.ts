import { eq } from "drizzle-orm";
import { db } from "../../configs/db.config.js";
import { Users } from "../../models/users.model.js";
import { lower } from "../../models/columns-helper.model.js";

export const findUserByEmail = async (email: string) => {
  try {
    const user = await db
      .select()
      .from(Users)
      .where(eq(lower(Users.email), email.toLowerCase()))
      .limit(1);

    return user;
  } catch (error) {
    throw error;
  }
};

export const createUser = async (data: any) => {
  try {
    const newUser = await db.insert(Users).values(data).returning();

    return newUser;
  } catch (error) {
    throw error;
  }
};

export const getAllUserFromDb = async () => {
  try {
    const allUsers = await db.select().from(Users);
    return allUsers;
  } catch (error) {
    throw error;
  }
};

export const deleteUserById = async (userId: string) => {
  try {
    await db.delete(Users).where(eq(Users.id, userId));
  } catch (error) {
    throw error;
  }
};
