var DataTypes = require("sequelize").DataTypes;
var _Sessions = require("./Sessions");
var _about = require("./about");
var _carousel = require("./carousel");
var _db_postal_code_data = require("./db_postal_code_data");
var _db_province_data = require("./db_province_data");
var _informationtitle = require("./informationtitle");
var _product = require("./product");
var _productstitle = require("./productstitle");
var _serviceinovate = require("./serviceinovate");
var _serviceinovateDetail = require("./serviceinovateDetail");
var _technical = require("./technical");
var _titleAbout = require("./titleAbout");
var _user = require("./user");

function initModels(sequelize) {
  var Sessions = _Sessions(sequelize, DataTypes);
  var about = _about(sequelize, DataTypes);
  var carousel = _carousel(sequelize, DataTypes);
  var db_postal_code_data = _db_postal_code_data(sequelize, DataTypes);
  var db_province_data = _db_province_data(sequelize, DataTypes);
  var informationtitle = _informationtitle(sequelize, DataTypes);
  var product = _product(sequelize, DataTypes);
  var productstitle = _productstitle(sequelize, DataTypes);
  var serviceinovate = _serviceinovate(sequelize, DataTypes);
  var serviceinovateDetail = _serviceinovateDetail(sequelize, DataTypes);
  var technical = _technical(sequelize, DataTypes);
  var titleAbout = _titleAbout(sequelize, DataTypes);
  var user = _user(sequelize, DataTypes);


  return {
    Sessions,
    about,
    carousel,
    db_postal_code_data,
    db_province_data,
    informationtitle,
    product,
    productstitle,
    serviceinovate,
    serviceinovateDetail,
    technical,
    titleAbout,
    user,
  };
}
module.exports = initModels;
module.exports.initModels = initModels;
module.exports.default = initModels;
