import { Model, Table, Column, DataType, ForeignKey, BelongsTo } from "sequelize-typescript";
import User from "../user/user.model";
import Post from "../post/post.model";

@Table({
  tableName: "likes",
})
export default class Like extends Model {
  @Column({
    type: DataType.INTEGER,
    primaryKey: true,
    autoIncrement: true,
    field: "id"
  })
  id?: number;

  @ForeignKey(() => User)
  @Column({
    type: DataType.INTEGER,
    field: "userId",
    onUpdate: 'CASCADE',
    onDelete: 'CASCADE',
    allowNull: false,
  })
  userId?: number;

  @ForeignKey(() => Post)
  @Column({
    type: DataType.INTEGER,
    field: "postId",
  })
  postId?: number;

  @BelongsTo(() => Post)
  post?: Post;

  @Column({
    type: DataType.DATE,
    field: "createdAt",
    allowNull: false,
  })
  createdAt?: Date;

  @Column({
    type: DataType.DATE,
    field: "updatedAt",
    allowNull: false,
  })
  updatedAt?: Date;
}
