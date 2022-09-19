
const initModels = require("../../model/init-models");
const db = require('../../../config/db.config')
const About = initModels(db.sequelize).about
const {createError} = require('../../helper');
exports.createData = async (req,res,next) =>{
    try{
        let {title,subtitle} = req.body;
        const result = await About.create({title,subtitle})
        
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
        const result = await About.findAll()
        res.json(result)
    } catch (error) {
       res.send(createError(400, error));
        next(error);
    }
}
exports.findById = async (req,res,next) =>{
    try{
        const result = await About.findOne(
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
        const data = await About.destroy({
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