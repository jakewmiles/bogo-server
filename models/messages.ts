import { BuildOptions, DataTypes, Model, Sequelize } from 'sequelize';


export interface MessagesAttributes {
  authorid: string;
  content: string;
}

export interface MessagesModel extends Model<MessagesAttributes>, MessagesAttributes {}
export class Messages extends Model<MessagesModel, MessagesAttributes> {};

export type MessagesStatic = typeof Model & {
  new(value?: object, options?: BuildOptions): MessagesModel;
}

export function MessagesFactory (sequelize:Sequelize) {
  return <MessagesStatic>sequelize.define('messages', {
    authorId: {
      type: DataTypes.STRING(50),
      allowNull: false,
    },
    content: {
      type: DataTypes.STRING(200),
      allowNull: false,
    }
  })
}