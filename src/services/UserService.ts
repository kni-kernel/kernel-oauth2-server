import bcrypt from "bcrypt";

import User from "@models/User";

import Logger from "@util/logger";

import UserUpdates from "UserUpdates";
import UserGetOptions from "UserGetOptions";

export default class UserService {
  /**
   * Returns all users
   * @param opts
   */
  public static async getUsers(opts?: UserGetOptions): Promise<User[]> {
    try {
      if (opts) {
        return await User.findAll({
          where: {
            ...opts,
          },
        });
      }

      return await User.findAll();
    } catch (err) {
      Logger.log("error", "UserService getUsers error", { err });
      return null;
    }
  }

  /**
   * Returns user based on username and password
   * @param username
   * @param password
   */
  public static async getUserByLoginAndPassword(username: string, password: string): Promise<User> {
    try {
      const user = await User.findOne({
        where: {
          username,
        },
      });

      if (!user) {
        Logger.log("info", `This user doesn't exists! (${username})`);
        return null;
      }

      const match = await bcrypt.compare(password, user.password);

      if (!match) {
        Logger.log("info", `Incorrect password for user! (${username})`);
        return null;
      }

      return user;
    } catch (err) {
      Logger.log("error", "UserService getUserByLoginAndPassword error", { err });
      return null;
    }
  }

  /**
   * Gets user by ID
   * @param id
   */
  public static async getUserById(id: number): Promise<User> {
    try {
      const user = await User.findByPk(id);

      if (!user) {
        Logger.log("info", `This user doesn't exists! (${id})`);
        return null;
      }

      return user;
    } catch (err) {
      Logger.log("error", "UserService getUserById error", { err });
      return null;
    }
  }

  /**
   * Updates user by ID
   * @param id
   * @param updates
   */
  public static async updateUser(id: number, updates: UserUpdates): Promise<boolean> {
    try {
      if (updates.password.length === 0) {
        delete updates.password;
      } else {
        updates.password = await bcrypt.hash(updates.password, 10);
      }
      await User.update(updates, {
        where: {
          id,
        },
      });
      return true;
    } catch (err) {
      Logger.log("error", "UserService updateUser error", { err });
      return false;
    }
  }
}
