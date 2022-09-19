const initModels = require("../../model/init-models");
const db = require('../../../config/db.config')
const Model = initModels(db.sequelize).informationtitle
const {createError} = require('../../helper');
exports.createData = async (req,res,next) =>{
    try{
        let {judul,subtitle} = req.body;
        const result = await Model.create({judul,subtitle})
        
        res.json({
            message: 'Ok',
            result: result
        })
    }
    catch(error){
       res.send(createError(400, error));
        next(error)
    }
}

exports.findAll = async (req,res,next) =>{
    try{
        const result = await Model.findAll()
        res.json(result)
    } catch (error) {
       res.send(createError(400, error));
        next(error);
    }
}
exports.findById = async (req,res,next) =>{
    try{
        const result = await Model.findOne(
            {where :{
                id:req.params.id
            }}
        )
        res.json(result)
    } catch (error) {
       res.send(createError(400, error));
        next(error);
    }
}
exports.removeById = async (req,res,next) =>{
    try {
        const data = await Model.destroy({
            where:{
                id:req.params.id
            }
        })
        res.json({data})
    } catch (error) {
       res.send(createError(400, error));
        next(error)
    }
}