const initModels = require("../../model/init-models");
const db = require('../../../config/db.config')
const Model = initModels(db.sequelize).db_province_data
const SubModel = initModels(db.sequelize).db_postal_code_data
Model.removeAttribute('id');

exports.findProvinsi = async (req,res,next) =>{
    try{
        let {provinsi} = req.body;
        // console.log({provinsi,kota,kecamatan,kelurahan})
        const result = await Model.findAll(
            {where :{
                province_name:{
                   [db.Sequelize.Op.like]: `%${provinsi.toUpperCase()}%`
                }
            }}
        )
        res.json(result)
    } catch (error) {
        next(error);
    }
}
exports.findPostal = async (req,res,next) =>{
    try{
        let {code,kota,kecamatan,kelurahan} = req.body;
        // console.log({provinsi,kota,kecamatan,kelurahan})
        
        const result = await SubModel.findAll(
            {where :{
                province_code:code,
                city:{
                   [db.Sequelize.Op.like]: `%${kota.toUpperCase()}%`
                },
                sub_district:{
                    [db.Sequelize.Op.like]: `%${kecamatan.toUpperCase()}%`
                },
                urban:{
                    [db.Sequelize.Op.like]: `%${kelurahan.toUpperCase()}%`
                },
                

            }
        }
        )
        res.json(result)
    } catch (error) {
        next(error);
    }
}

