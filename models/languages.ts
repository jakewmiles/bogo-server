import { BuildOptions, DataTypes, Model, Sequelize } from 'sequelize';

export interface LanguageAttributes {
  name: string;
}

export interface LanguageModel extends Model<LanguageAttributes>, LanguageAttributes {}
export class Language extends Model<LanguageModel, LanguageAttributes> {};

export type LanguageStatic = typeof Model & {
  new(value?: object, options?: BuildOptions): LanguageModel;
}

export function LanguageFactory (sequelize:Sequelize) {
  return <LanguageStatic>sequelize.define('language', {
    name: {
      type: DataTypes.STRING(50),
      allowNull: false,
      unique: true,
    }
  })
}