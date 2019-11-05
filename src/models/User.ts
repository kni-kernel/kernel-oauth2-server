import {
  AutoIncrement,
  Column,
  CreatedAt,
  DataType,
  DeletedAt,
  HasOne,
  IsEmail,
  Model,
  PrimaryKey,
  Table,
  Unique,
  UpdatedAt,
} from "sequelize-typescript";

import Token from "@models/Token";

@Table({
  tableName: "users",
  underscored: true,
})
export default class User extends Model<User> {
  @PrimaryKey
  @AutoIncrement
  @Column
  public id: number;

  @Unique
  @Column
  public login: string;

  @Column
  public password: string;

  @Unique
  @IsEmail
  @Column
  public email: string;

  @Column
  public beginningYear: number;

  @Column({
    type: DataType.ENUM("Student", "Foreman", "Admin"),
  })
  public privilege: Privilege;

  @HasOne(() => User, "id")
  public token: Token;

  @CreatedAt
  public createdAt: Date;

  @UpdatedAt
  public updatedAt: Date;

  @DeletedAt
  public deletedAt: Date;
}
