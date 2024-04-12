import { Model, Table, Column, DataType, ForeignKey } from "sequelize-typescript";
import User from "./user.model";
import Post from "./post.model";

@Table({
  tableName: "likes",
})
export default class Like extends Model {
  @Column({
    type: DataType.INTEGER,
    primaryKey: true,
    autoIncrement: true,
    field: "LikeDislikeID"
  })
  LikeDislikeID?: number;

  @ForeignKey(() => Post)
  @Column({
    type: DataType.INTEGER,
    field: "PostID"
  })
  PostID?: number;

  @ForeignKey(() => User)
  @Column({
    type: DataType.INTEGER,
    field: "UserID"
  })
  UserID?: number;

  @Column({
    type: DataType.BOOLEAN,
    field: "Like"
  })
  Like?: boolean;

}
