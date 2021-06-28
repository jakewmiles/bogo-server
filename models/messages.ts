import { BuildOptions, DataTypes, Model, Sequelize } from 'sequelize';


export interface MessagesAttributes {
  id: number;
  userid: string;
  content: string;
}

export interface MessagesModel extends Model<MessagesAttributes>, MessagesAttributes {}
export class Messages extends Model<MessagesModel, MessagesAttributes> {};

export type MessagesStatic = typeof Model & {
  new(value?: object, options?: BuildOptions): MessagesModel;
}

export function MessagesFactory (sequelize:Sequelize) {
  return <MessagesStatic>sequelize.define('messages', {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true
    },
    userid: {
      type: DataTypes.STRING(50),
      allowNull: false,
    },
    content: {
      type: DataTypes.STRING(200),
      allowNull: false,
    }
  })
}