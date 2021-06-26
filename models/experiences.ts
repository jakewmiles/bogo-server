import { BuildOptions, DataTypes, Model, Sequelize } from 'sequelize';


export interface ExperiencesAttributes {
  id: number;
  title: string;
  description: string;
}

export interface ExperiencesModel extends Model<ExperiencesAttributes>, ExperiencesAttributes {}
export class Experiences extends Model<ExperiencesModel, ExperiencesAttributes> {};

export type ExperiencesStatic = typeof Model & {
  new(value?: object, options?: BuildOptions): ExperiencesModel;
}

export function ExperiencesFactory (sequelize:Sequelize) {
  return <ExperiencesStatic>sequelize.define('experiences', {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true
    },
    name: {
      type: DataTypes.STRING(50),
      allowNull: false,
    },
    description: {
      type: DataTypes.STRING(2000),
      allowNull: false,
    }
  })
}