import { BuildOptions, DataTypes, Model, Sequelize } from 'sequelize';

export interface UserAttributes {
  firstName: string;
  lastName: string;
  email: string;
  dob: string;
  password: string;
  guide: boolean;
  summary: string;
  profileImg: string;
  city: string;
  country: string;
  gender: string;
  filterCity: String;
}
export interface UserModel extends Model<UserAttributes>, UserAttributes { }
export class User extends Model<UserModel, UserAttributes> { }

export type UserStatic = typeof Model & {
  new(values?: object, options?: BuildOptions): UserModel;
};

export function UserFactory(sequelize: Sequelize) {
  return <UserStatic>sequelize.define("users", {
    email: {
      type: DataTypes.STRING(150),
      allowNull: false,
      unique: true,
    },
    firstName: {
      type: DataTypes.STRING(50),
    },
    dob: {
      type: DataTypes.STRING(50),
    },
    lastName: {
      type: DataTypes.STRING(50),
    },
    password: {
      type: DataTypes.STRING(100),
    },
    guide: {
      type: DataTypes.BOOLEAN,
    },
    summary: {
      type: DataTypes.STRING(1000),
    },
    profileImg: {
      type: DataTypes.STRING(200),
    },
    gender: {
      type: DataTypes.STRING(50),
    },
    city: {
      type: DataTypes.STRING(50),
    },
    country: {
      type: DataTypes.STRING(50),
    },
    filterCity: {
      type: DataTypes.STRING(50),
    }
  });
}