import { Model, Table, Column, DataType, ForeignKey } from "sequelize-typescript";
import User from "./user.model";
import Post from "./post.model";

@Table({
  tableName: "comments",
})
export default class Comment extends Model {
  @Column({
    type: DataType.INTEGER,
    primaryKey: true,
    autoIncrement: true,
    field: "CommentID"
  })
  CommentID?: number;

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
    type: DataType.STRING,
    field: "Content"
  })
  Content?: string;

  @Column({
    type: DataType.DATE,
    field: "Timestamp"
  })
  Timestamp?: Date;
}
