import { BuildOptions, DataTypes, Model, Sequelize } from 'sequelize';


export interface InterestsAttributes {
  id: number;
  name: string;
}

export interface InterestsModel extends Model<InterestsAttributes>, InterestsAttributes {}
export class Interests extends Model<InterestsModel, InterestsAttributes> {};

export type InterestsStatic = typeof Model & {
  new(value?: object, options?: BuildOptions): InterestsModel;
}

export function InterestsFactory (sequelize:Sequelize) {
  return <InterestsStatic>sequelize.define('interests', {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true
    },
    name: {
      type: DataTypes.STRING(50),
      allowNull: false,
      unique: true,
    }
  })
}