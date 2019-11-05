import Token from "@models/Token";

import userService from "@services/userService";

import Logger from "@util/logger";

import AccessToken from "AccessToken";

export default class TokenService {
  /**
   * Gets whole token object by refreshToken
   * @param refreshToken
   */
  public static async getRefreshToken(refreshToken: string): Promise<Token> {
    return Token.findOne({
      where: {
        refreshToken,
      },
    });
  }

  /**
   * Gets whole token object by accessToken
   * @param accessToken
   */
  public static async getTokenByAccessToken(accessToken: string): Promise<Token> {
    return Token.findOne({
      where: {
        accessToken,
      },
    });
  }

  /**
   * Saves new token to the database
   * @param token
   * @param client
   * @param user
   */
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  public static async saveToken(token: any, client: any, user: any): Promise<AccessToken> {
    // TODO: Think of checking if token exists and is valid before adding new one - maybe we can simply send old one, which is still valid
    try {
      const tokenModel = Token.build({
        accessToken: token.accessToken,
        accessTokenExpirationDate: token.accessTokenExpiresAt,
        client: client.clientId,
        refreshToken: token.refreshToken,
        refreshTokenExpirationDate: token.refreshTokenExpiresAt,
        userId: user.id,
      });

      await tokenModel.save();

      return {
        accessToken: tokenModel.accessToken,
        client: {
          id: client.clientId,
        },
        expires: tokenModel.accessTokenExpirationDate,
        user: userService.cleanUpUser(user),
      };
    } catch (err) {
      Logger.log("error", "TokenService saveToken error", { err });
      return null;
    }
  }
}
