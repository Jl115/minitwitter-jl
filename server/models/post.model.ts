import { Model, Table, Column, DataType, ForeignKey, BelongsTo } from "sequelize-typescript";
import User from "./user.model";

@Table({
  tableName: "posts",
})
export default class Post extends Model {
  @Column({
    type: DataType.INTEGER,
    primaryKey: true,
    autoIncrement: true,
    field: "id"
  })
  id?: number;

  @Column({
    type: DataType.STRING(255),
    field: "title"
  })
  title?: string;
  @Column({
    type: DataType.STRING(255),
    field: "content"
  })
  content?: string;

  @ForeignKey(() => User)
  @Column({
    type: DataType.INTEGER,
    allowNull: false,
    field: "userId",
    onUpdate: 'CASCADE',
    onDelete: 'CASCADE',
  })
  userId?: number;

  // Definieren der Assoziation
  @BelongsTo(() => User)
  user?: User;

  @Column({
    type: DataType.DATE,
    field: "Timestamp"
  })
  Timestamp?: Date;
}
