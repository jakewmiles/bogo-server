"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
exports.__esModule = true;
exports.UserFactory = exports.Review = void 0;
var sequelize_1 = require("sequelize");
var Review = /** @class */ (function (_super) {
    __extends(Review, _super);
    function Review() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    return Review;
}(sequelize_1.Model));
exports.Review = Review;
function UserFactory(sequelize) {
    return sequelize.define("reviews", {
        userId: {
            type: sequelize_1.DataTypes.STRING(50),
            allowNull: false
        },
        authorId: {
            type: sequelize_1.DataTypes.STRING(50)
        },
        rating: {
            type: sequelize_1.DataTypes.INTEGER
        },
        content: {
            type: sequelize_1.DataTypes.STRING(3000)
        }
    });
}
exports.UserFactory = UserFactory;
