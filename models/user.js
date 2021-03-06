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
exports.UserFactory = exports.User = void 0;
var sequelize_1 = require("sequelize");
var User = /** @class */ (function (_super) {
    __extends(User, _super);
    function User() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    return User;
}(sequelize_1.Model));
exports.User = User;
function UserFactory(sequelize) {
    return sequelize.define("users", {
        email: {
            type: sequelize_1.DataTypes.STRING(150),
            allowNull: false,
            unique: true
        },
        firstName: {
            type: sequelize_1.DataTypes.STRING(50)
        },
        dob: {
            type: sequelize_1.DataTypes.STRING(50)
        },
        lastName: {
            type: sequelize_1.DataTypes.STRING(50)
        },
        password: {
            type: sequelize_1.DataTypes.STRING(100)
        },
        guide: {
            type: sequelize_1.DataTypes.BOOLEAN
        },
        summary: {
            type: sequelize_1.DataTypes.STRING(1000)
        },
        profileImg: {
            type: sequelize_1.DataTypes.STRING(200)
        },
        gender: {
            type: sequelize_1.DataTypes.STRING(50)
        },
        city: {
            type: sequelize_1.DataTypes.STRING(50)
        },
        country: {
            type: sequelize_1.DataTypes.STRING(50)
        },
        filterCity: {
            type: sequelize_1.DataTypes.STRING(50)
        }
    });
}
exports.UserFactory = UserFactory;
