import { Model, Table, Column, DataType, ForeignKey } from "sequelize-typescript";
import Role from "./role.model";

@Table({
  tableName: "users",
})
export default class User extends Model {
  @Column({
    type: DataType.INTEGER,
    primaryKey: true,
    autoIncrement: true,
    allowNull: false,

    field: "id"
  })
  id?: number;

  @Column({
    type: DataType.STRING(255),
    field: "username"
  })
  username?: string;

  @Column({
    type: DataType.STRING(255),
    field: "password"
  })
  password?: string;

  @ForeignKey(() => Role)
  @Column({
    type: DataType.INTEGER,
    field: "roleId",
    defaultValue: 3
  })
  roleId?: number;
}
