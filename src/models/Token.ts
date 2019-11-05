import {
  AutoIncrement,
  Column,
  CreatedAt,
  DeletedAt,
  ForeignKey,
  Model,
  PrimaryKey,
  Table,
  UpdatedAt,
} from "sequelize-typescript";

import User from "@models/User";

@Table({
  tableName: "oauth_tokens",
  underscored: true,
})
export default class Token extends Model<Token> {
  @PrimaryKey
  @AutoIncrement
  @Column
  public id: number;

  @Column
  public accessToken: string;

  @Column
  public accessTokenExpirationDate: Date;

  @Column
  public clientId: string;

  @Column
  public refreshToken: string;

  @Column
  public refreshTokenExpirationDate: Date;

  @ForeignKey(() => User)
  @Column
  public userId: number;

  @CreatedAt
  public createdAt: Date;

  @UpdatedAt
  public updatedAt: Date;

  @DeletedAt
  public deletedAt: Date;
}
