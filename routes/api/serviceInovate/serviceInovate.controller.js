const initModels = require("../../model/init-models");
const db = require('../../../config/db.config')
const Model = initModels(db.sequelize).serviceinovate
const SubModel = initModels(db.sequelize).serviceinovateDetail
const {createError} = require('../../helper');
const multer = require('multer')
const fs = require('fs')
const path = require('path');
const IMAGE_DIR = "/upload/service"
exports.uploadImg = multer({storage:multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, `${process.cwd()}${IMAGE_DIR}`);
      },
    filename: function (req, file, cb) {
        cb(null, file.fieldname+"-"+file.originalname);
    }
})}).fields([{name:"image",maxCount:1},{name:"detailImage",maxCount:1}]);

exports.createData = async (req,res,next) =>{
    try{
        let {image,detailImage,title,description} = req.body;
        Model.hasOne(SubModel,{foreignKey:"detailId"})
        SubModel.belongsTo(Model,{foreignKey:"detailId",as:"id"})
        console.log(req.files.image)
        const result = await Model.create({
            image:`${IMAGE_DIR}/${req.files.image[0].filename}`
        }).then(async(data)=>{
            let respon = await SubModel.create({
                detailId:data.id,
                imageDetail:`${IMAGE_DIR}/${req.files.detailImage[0].filename}`,
                title,
                description
            })
            return respon;
        })
        
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
        Model.hasOne(SubModel,{foreignKey:"detailId"})
        SubModel.belongsTo(Model,{foreignKey:"detailId"})
        const result = await Model.findAll({
            include:[
                {model:SubModel}
            ]
        })
        res.json(result)
    } catch (error) {
       res.send(createError(400, error));
        next(error);
    }
}
exports.findById = async (req,res,next) =>{
    try{
        Model.hasOne(SubModel,{foreignKey:"detailId"})
        SubModel.belongsTo(Model,{foreignKey:"detailId"})
        const result = await Model.findOne(
            {where :{
                id:req.params.id
            },
            include:[
                {model:SubModel}
            ]
        }
        )
        res.json(result)
    } catch (error) {
       res.send(createError(400, error));
        next(error);
    }
}
exports.removeById = async (req,res,next) =>{
    try {
        Model.hasOne(SubModel,{foreignKey:"detailId"})
        SubModel.belongsTo(Model,{foreignKey:"detailId"})
        const search = await Model.findOne(
            {where :{
                id:req.params.id
            },
            include:[
                {model:SubModel}
            ]
        }
        ) 
        fs.unlinkSync(path.resolve(`./${search.image}`))
        fs.unlinkSync(path.resolve(`./${search.serviceinovateDetail.imageDetail}`))
       
        const data = await Model.destroy({
            where:{
                id:req.params.id
            }
            ,
            include:[
                {model:SubModel}
            ]
        })
        res.json({data})
    } catch (error) {
       res.send(createError(400, error));
        next(error)
    }
}