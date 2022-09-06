var DataTypes = require("sequelize").DataTypes;
var _about = require("./about");
var _carousel = require("./carousel");
var _informationtitle = require("./informationtitle");
var _product = require("./product");
var _productstitle = require("./productstitle");
var _serviceinovate = require("./serviceinovate");
var _serviceinovateDetail = require("./serviceinovateDetail");
var _technical = require("./technical");
var _titleAbout = require("./titleAbout");

function initModels(sequelize) {
  var about = _about(sequelize, DataTypes);
  var carousel = _carousel(sequelize, DataTypes);
  var informationtitle = _informationtitle(sequelize, DataTypes);
  var product = _product(sequelize, DataTypes);
  var productstitle = _productstitle(sequelize, DataTypes);
  var serviceinovate = _serviceinovate(sequelize, DataTypes);
  var serviceinovateDetail = _serviceinovateDetail(sequelize, DataTypes);
  var technical = _technical(sequelize, DataTypes);
  var titleAbout = _titleAbout(sequelize, DataTypes);


  return {
    about,
    carousel,
    informationtitle,
    product,
    productstitle,
    serviceinovate,
    serviceinovateDetail,
    technical,
    titleAbout,
  };
}
module.exports = initModels;
module.exports.initModels = initModels;
module.exports.default = initModels;
