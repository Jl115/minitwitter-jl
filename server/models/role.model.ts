import { Model, Table, Column, DataType, HasMany } from "sequelize-typescript";
import User from "./user.model";

@Table({
  tableName: "roles",
})
export default class Role extends Model {
  @Column({
    type: DataType.INTEGER,
    primaryKey: true,
    field: "id"
  })
  id?: number;

  @Column({
    type: DataType.STRING(255),
    field: "RoleName"
  })
  RoleName?: string;

  @HasMany(() => User)
  Users?: User[];

}
