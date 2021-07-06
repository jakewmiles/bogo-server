import { BuildOptions, DataTypes, Model, Sequelize } from 'sequelize';

export interface ReviewAttributes {
  authorId: string;
  rating: number;
  content: string;
}
export interface ReviewModel extends Model<ReviewAttributes>, ReviewAttributes { }
export class Review extends Model<ReviewModel, ReviewAttributes> { }

export type ReviewStatic = typeof Model & {
  new(values?: object, options?: BuildOptions): ReviewModel;
};

export function ReviewFactory(sequelize: Sequelize) {
  return <ReviewStatic>sequelize.define("reviews", {
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