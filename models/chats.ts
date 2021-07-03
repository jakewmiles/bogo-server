import { BuildOptions, DataTypes, Model, Sequelize } from 'sequelize';


export interface ChatsAttributes {
  user1Id: string;
}

export interface ChatsModel extends Model<ChatsAttributes>, ChatsAttributes { }
export class Chats extends Model<ChatsModel, ChatsAttributes> { };

export type ChatsStatic = typeof Model & {
  new(value?: object, options?: BuildOptions): ChatsModel;
}

export function ChatsFactory(sequelize: Sequelize) {
  return <ChatsStatic>sequelize.define('chats', {
    user1Id: {
      type: DataTypes.STRING,
    },
  })
}