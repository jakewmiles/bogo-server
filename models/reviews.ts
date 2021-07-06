import { BuildOptions, DataTypes, Model, Sequelize } from 'sequelize';

export interface ReviewAttributes {
  userId: string;
  authorId: string;
  rating: number;
  content: string;
}
export interface ReviewModel extends Model<ReviewAttributes>, ReviewAttributes { }
export class Review extends Model<ReviewModel, ReviewAttributes> { }

export type ReviewStatic = typeof Model & {
  new(values?: object, options?: BuildOptions): ReviewModel;
};

export function UserFactory(sequelize: Sequelize) {
  return <ReviewStatic>sequelize.define("reviews", {
    userId: {
      type: DataTypes.STRING(50),
      allowNull: false,
    },
    authorId: {
      type: DataTypes.STRING(50),
    },
    rating: {
      type: DataTypes.INTEGER,
    },
    content: {
      type: DataTypes.STRING(3000),
    },
  });
}