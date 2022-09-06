const Sequelize = require("sequelize");

const ReadEnv = require("../utils/readEnv").ReadEnv
const readEnv = new ReadEnv();



    const sequelize = new Sequelize( readEnv.get("DB_DATABASE"), readEnv.get("DB_USERNAME"), readEnv.get("DB_PASSWORD"), {
        host: readEnv.get("DB_HOST"),
        port: readEnv.get("DB_PORT"),
        dialect: "mysql",
        operatorsAliases: false,
        // pool: {
        //     max: 5,
        //     min: 0,
        //     acquire: 30000,
        //     idle: 10000
        //   }
    });
    const db = {};
    db.Sequelize = Sequelize;
    db.sequelize = sequelize;
    //db.nlp_data_training = require(`../model/intern_2022/nlp_data_training`)(sequelize, Sequelize.DataTypes);
 


// console.log(arrayDB[0].history_gates);

// http://localhost:5000/api/get-sql?dbName=agms_pasar_minggu_debug&startDate=2022-1-7&endDate=2022-1-9
// sequelize-auto -o "./server/model/agms_pasar_minggu_debug" -d agms_pasar_minggu_debug -h 206.189.157.212 -u root -p 3307 -x password123 -e mysql -a "./config/config.json"

module.exports = db;