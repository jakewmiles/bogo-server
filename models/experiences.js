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
exports.ExperiencesFactory = exports.Experiences = void 0;
var sequelize_1 = require("sequelize");
var Experiences = /** @class */ (function (_super) {
    __extends(Experiences, _super);
    function Experiences() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    return Experiences;
}(sequelize_1.Model));
exports.Experiences = Experiences;
;
function ExperiencesFactory(sequelize) {
    return sequelize.define('experiences', {
        id: {
            type: sequelize_1.DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },
        name: {
            type: sequelize_1.DataTypes.STRING(50),
            allowNull: false
        },
        description: {
            type: sequelize_1.DataTypes.STRING(2000),
            allowNull: false
        }
    });
}
exports.ExperiencesFactory = ExperiencesFactory;
