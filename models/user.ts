import { BuildOptions, DataTypes, Model, Sequelize } from 'sequelize';

export interface UserAttributes {
    firstName: string;
    lastName:string;
    email: string;
    dob: string;
    password: string;
    guide: boolean;
    summary: string;
    profileImg:string;
    headerImg: string;
    location: string;
    gender: string;
}
export interface UserModel extends Model<UserAttributes>, UserAttributes {}
export class User extends Model<UserModel, UserAttributes> {}

export type UserStatic = typeof Model & {
    new (values?: object, options?: BuildOptions): UserModel;
};

export function UserFactory (sequelize: Sequelize) {
    return <UserStatic>sequelize.define("users", {
        email: {
          type: DataTypes.STRING(150),
          allowNull: false,
          unique: true,
        },
        firstName: {
          type: DataTypes.STRING(50),
          allowNull: false,
        },
        dob: {
          type: DataTypes.STRING(50),
          allowNull: false,
        },
        lastName: {
          type: DataTypes.STRING(50),
          allowNull: false,
        },
        password: {
          type: DataTypes.STRING(100),
          allowNull: false,
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
        headerImg: {
          type: DataTypes.STRING(200),
        },
        gender: {
          type: DataTypes.STRING(50),
        },
        location: {
          type: DataTypes.STRING(50),
        }
    });
}