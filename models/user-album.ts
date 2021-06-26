import { BuildOptions, DataTypes, Model, Sequelize } from 'sequelize';

export interface UserAlbumAttributes {
  id: number;
  imageURL:string
}

export interface UserAlbumModel extends Model<UserAlbumAttributes>, UserAlbumAttributes {}
export class UserAlbum extends Model<UserAlbumModel, UserAlbumAttributes> {};

export type UserAlbumStatic = typeof Model & {
  new(value?: object, options?: BuildOptions): UserAlbumModel;
}

export function UserAlbumFactory (sequelize:Sequelize) {
  return <UserAlbumStatic>sequelize.define('userAlbum', {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true
    },
    imageURL: {
      type: DataTypes.STRING(200),
      allowNull: false,
    }
  })
}