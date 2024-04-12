import { Model, Table, Column, DataType, ForeignKey, BelongsTo, HasMany } from "sequelize-typescript";
import User from "../user/user.model";
import Like from "../like/like.model";
import Comment from "../comment/comment.model";

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
    type: DataType.STRING,
    allowNull: false,
    field: "title"
  })
  title?: string;

  @Column({
    type: DataType.TEXT,
    allowNull: false,
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


  @BelongsTo(() => User)
  user?: User;

  @HasMany(() => Like)
  likes?: Like[];
  @HasMany(() => Comment)
  comments?: Comment[];


  @Column({
    type: DataType.DATE,
    allowNull: false,
    field: "createdAt"
  })
  createdAt?: Date;

  @Column({
    type: DataType.DATE,
    allowNull: false,
    field: "updatedAt"
  })
  updatedAt?: Date;
}
