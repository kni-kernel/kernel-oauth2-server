import bcrypt from "bcrypt";

import User from "@models/User";

import Logger from "@util/logger";

export default class UserService {
  /**
   * Returns user based on login and password
   * @param login
   * @param password
   */
  public static async getUserByLoginAndPassword(login: string, password: string): Promise<User> {
    try {
      const user = await User.findOne({
        where: {
          login,
        },
      });

      if (!user) {
        Logger.log("info", `This user doesn't exists! (${login})`);
        return null;
      }

      const match = await bcrypt.compare(password, user.password);

      if (!match) {
        Logger.log("info", `Incorrect password for user! (${login})`);
        return null;
      }

      return user;
    } catch (err) {
      Logger.log("error", "UserService getUserByLoginAndPassword error", { message: err });
      return null;
    }
  }

  /**
   * Returns user by primary key (id)
   * @param id
   */
  public static async getUserById(id: number): Promise<User> {
    return User.findByPk(id);
  }

  /**
   * Returns user without sensitive data
   * @param user
   */
  public static cleanUpUser(user: User): Partial<User> {
    return {
      id: user.id,
      login: user.login,
      beginningYear: user.beginningYear,
      email: user.email,
      privilege: user.privilege,
    };
  }

  // TODO: Add creating users here, with verification, whether requesting user is admin

  // TODO: Add editing users here, with verification, whether requesting user is admin (edit all), foreman (edit his year), user (edit himself)
}
