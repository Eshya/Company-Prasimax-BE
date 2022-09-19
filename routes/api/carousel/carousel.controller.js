const initModels = require("../../model/init-models");
const db = require('../../../config/db.config')
const Model = initModels(db.sequelize).carousel
const multer = require('multer')
const fs = require('fs')
const path = require('path');
const {createError} = require('../../helper');
const IMAGE_DIR = "/upload/carousel"
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
        let {title,subtitle} = req.body;
        
        // if (!fs.existsSync(`${process.cwd()}${IMAGE_DIR}`)){
        //     fs.mkdirSync(`${process.cwd()}${IMAGE_DIR}`);
        // }
        const result = await Model.create({
            image:`${IMAGE_DIR}/${req.file.filename}`,
            title,subtitle})
        
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
        next(error)
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
        next(error)
    }
}
exports.updateById = async (req,res,next) =>{
    try{
        // const result = await Model.findOne(
        //     {where :{
        //         id:req.params.id
        //     }}
        // )
        res.json({testing:"ok"})
    } catch (error) {
        res.send(createError(400, error));
        next(error)
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