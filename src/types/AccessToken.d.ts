import User from "@models/User";

export default interface AccessToken {
  accessToken: string;
  client: {
    id: string;
  };
  expires: Date;
  user: Partial<User>;
}
