import User from "@models/User";

import clientsService from "@services/clientsService";
import tokenService from "@services/tokenService";
import userService from "@services/userService";

import AccessToken from "AccessToken";
import ClientResponse from "ClientResponse";
import RefreshToken from "RefreshToken";

const model = {
  getAccessToken: async function(accessToken: string): Promise<AccessToken> {
    try {
      const token = await tokenService.getTokenByAccessToken(accessToken);
      const client = await clientsService.getClientById(token.clientId);
      const user = await userService.getUserById(token.userId);

      if (!token || !client || !user) {
        return null;
      }

      return {
        accessToken: token.accessToken,
        client: {
          id: client.clientId,
        },
        expires: token.accessTokenExpirationDate,
        user: userService.cleanUpUser(user),
      };
    } catch (err) {
      return null;
    }
  },

  getRefreshToken: async function(bearerToken: string): Promise<RefreshToken> {
    try {
      const refreshToken = await tokenService.getRefreshToken(bearerToken);
      const client = await clientsService.getClientById(refreshToken.clientId);
      const user = await userService.getUserById(refreshToken.userId);

      if (!refreshToken || !user || !client) {
        return null;
      }

      return {
        refreshToken: refreshToken.accessToken,
        client: {
          id: client.clientId,
        },
        expires: refreshToken.accessTokenExpirationDate,
        user: userService.cleanUpUser(user),
      };
    } catch (err) {
      return null;
    }
  },

  getClient: async function(clientId: string, clientSecret?: string): Promise<ClientResponse> {
    try {
      const client = await clientsService.getClientByIdAndSecret(clientId, clientSecret);

      if (!client) {
        return null;
      }

      return {
        clientId: client.clientId,
        clientSecret: client.clientSecret,
        grants: ["password", "refresh_token"],
      };
    } catch (err) {
      return null;
    }
  },

  getUser: async function(login: string, password: string): Promise<User> {
    return await userService.getUserByLoginAndPassword(login, password);
  },

  saveToken: async function(token, client, user): Promise<AccessToken> {
    return await tokenService.saveToken(token, client, user);
  },
};

export default model;
