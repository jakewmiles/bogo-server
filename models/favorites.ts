import { BuildOptions, DataTypes, Model, Sequelize } from 'sequelize';


export interface FavoritesAttributes {
  id: number;
}

export interface FavoritesModel extends Model<FavoritesAttributes>, FavoritesAttributes {}
export class Favorites extends Model<FavoritesModel, FavoritesAttributes> {};

export type FavoritesStatic = typeof Model & {
  new(value?: object, options?: BuildOptions): FavoritesModel;
}

export function FavoritesFactory (sequelize:Sequelize) {
  return <FavoritesStatic>sequelize.define('favorites', {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true
    },
  })
}