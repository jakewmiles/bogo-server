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
exports.UserAlbumFactory = exports.UserAlbum = void 0;
var sequelize_1 = require("sequelize");
var UserAlbum = /** @class */ (function (_super) {
    __extends(UserAlbum, _super);
    function UserAlbum() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    return UserAlbum;
}(sequelize_1.Model));
exports.UserAlbum = UserAlbum;
;
function UserAlbumFactory(sequelize) {
    return sequelize.define('userAlbum', {
        imageURL: {
            type: sequelize_1.DataTypes.STRING(200),
            allowNull: false
        }
    });
}
exports.UserAlbumFactory = UserAlbumFactory;
