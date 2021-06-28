import { BuildOptions, DataTypes, Model, Sequelize } from 'sequelize';


export interface FavoritesAttributes {
  user1Id:string;
}

export interface FavoritesModel extends Model<FavoritesAttributes>, FavoritesAttributes {}
export class Favorites extends Model<FavoritesModel, FavoritesAttributes> {};

export type FavoritesStatic = typeof Model & {
  new(value?: object, options?: BuildOptions): FavoritesModel;
}

export function FavoritesFactory (sequelize:Sequelize) {
  return <FavoritesStatic>sequelize.define('favorites', {
    user1Id: {
      type: DataTypes.STRING,
    },
  })
}