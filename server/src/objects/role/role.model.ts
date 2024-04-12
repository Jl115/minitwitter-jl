import { Model, Table, Column, DataType, HasMany } from "sequelize-typescript";
import User from "../user/user.model";

@Table({
  tableName: "roles",
})
export default class Role extends Model {
  @Column({
    type: DataType.INTEGER,
    primaryKey: true,
    autoIncrement: true,
    field: "id"
  })
  id?: number;

  @Column({
    type: DataType.STRING(255),
    field: "RoleName"
  })
  RoleName?: string;

  @Column({
    type: DataType.DATE,
    allowNull: false,
    defaultValue: DataType.NOW,
    field: "createdAt"
  })
  createdAt?: Date;

  @Column({
    type: DataType.DATE,
    allowNull: false,
    defaultValue: DataType.NOW,
    field: "updatedAt"
  })
  updatedAt?: Date;

  @HasMany(() => User)
  Users?: User[];
}
