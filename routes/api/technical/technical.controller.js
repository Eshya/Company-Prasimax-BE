const initModels = require("../../model/init-models");
const db = require('../../../config/db.config')
const Model = initModels(db.sequelize).technical
const multer = require('multer')
const fs = require('fs')
const path = require('path');
const {createError} = require('../../helper');
const IMAGE_DIR = "/upload/technical"
exports.uploadImg = multer({storage:multer.diskStorage({
    destination: function (req, file, cb) {

        cb(null, `${process.cwd()}${IMAGE_DIR}`);
      },
    filename: function (req, file, cb) {
        cb(null, file.originalname);
    }
})}).single('image');
exports.createData = async (req,res,next) =>{
    try{
        let {dateT,title,description} = req.body;
        console.log(dateT)
        const result = await Model.create({dateT,title,description,
        image:`${IMAGE_DIR}/${req.file.filename}`})
        
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
        const search = await Model.findOne(
            {where :{
                id:req.params.id
            }}
        )
        fs.unlinkSync(path.resolve(`./${search.image}`))
       
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