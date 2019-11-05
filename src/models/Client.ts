import { AutoIncrement, Column, CreatedAt, DeletedAt, Model, PrimaryKey, Table, UpdatedAt } from "sequelize-typescript";

@Table({
  tableName: "oauth_clients",
  underscored: true,
})
export default class Client extends Model<Client> {
  @PrimaryKey
  @AutoIncrement
  @Column
  public id: number;

  @Column
  public clientId: string;

  @Column
  public clientSecret: string;

  @Column
  public redirectUri: string;

  @CreatedAt
  public createdAt: Date;

  @UpdatedAt
  public updatedAt: Date;

  @DeletedAt
  public deletedAt: Date;
}
