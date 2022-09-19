const initModels = require("../../model/init-models");
const db = require('../../../config/db.config')
const Model = initModels(db.sequelize).product
const multer = require('multer')
const fs = require('fs')
const path = require('path')
const {createError} = require('../../helper');
const IMAGE_DIR = "/upload/product"
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
        let {name,category,status,keterangan} = req.body;
        
        const result = await Model.create({
            image:`${IMAGE_DIR}/${req.file.filename}`,
            name,category,status,keterangan})
        
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
        console.log(search)
        
        fs.unlinkSync(path.resolve(`./${search.image}`));
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