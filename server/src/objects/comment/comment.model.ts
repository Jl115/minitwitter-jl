import { Model, Table, Column, ForeignKey, DataType, BelongsTo } from 'sequelize-typescript';
import User from '../user/user.model';
import Post from '../post/post.model';

@Table({
  tableName: 'comments'
})
export default class Comment extends Model {
  @Column({
    type: DataType.INTEGER,
    autoIncrement: true,
    primaryKey: true,
    allowNull: false
  })
  id!: number;

  @ForeignKey(() => User)
  @Column({
    type: DataType.INTEGER,
    allowNull: false
  })
  userId!: number;

  @ForeignKey(() => Post)
  @Column({
    type: DataType.INTEGER,
  })
  postId!: number;

  @BelongsTo(() => Post)
  post?: Post;

  @Column({
    type: DataType.TEXT,
    allowNull: false
  })
  text!: string;
}
