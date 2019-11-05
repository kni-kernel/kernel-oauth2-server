import User from "@models/User";

export default interface RefreshToken {
  refreshToken: string;
  client: {
    id: string;
  };
  expires: Date;
  user: Partial<User>;
}
