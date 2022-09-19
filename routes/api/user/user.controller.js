const initModels = require("../../model/init-models");
const db = require('../../../config/db.config')
const passwordHash = require('password-hash');
const User = initModels(db.sequelize).user
const {createError} = require('../../helper');
const _beforeSave = (data) => {
    if(data.username) {
        data.username = data.username.toLowerCase()
    }
    if (data.password) {
        data.password = passwordHash.generate(data.password, {saltLength: 10});
    }
    return data;
};
exports.register = async (req, res, next) => {
    let {fullname, username, email, phoneNumber, password, alamat, perusahaan, profesi,isSubscribe} = _beforeSave(req.body);
    let result = []
    try {
        // console.log(req.body)
        let userResult= await createUser({fullname,username,email,phoneNumber,password,alamat,perusahaan,profesi},res)
        result.push(userResult)
        res.json({
          data: result,
          message: 'Ok'
        })
    } catch(err){
        next(err)
    }
}

exports.login = (username, password) => {
    return new Promise((resolve, reject) => {
        // console.log(username)
        User.findOne({where:
                {
                    [db.Sequelize.Op.or] : [{username: {[db.Sequelize.Op.eq]:username}}, {email: {[db.Sequelize.Op.eq]:username}}]
                }
            })
        .then((foundUser) => {
            // console.log(foundUser)
            if (foundUser === null && !validateEmail(username)) return reject(createError(400, 'Username not found!'));
            if (foundUser === null) return reject(createError(400, 'Username or Email not found!'));
            const hashedPassword = foundUser.password;
            const isValidPassword = passwordHash.verify(password, hashedPassword);
            if(isValidPassword){
                const userRemovePassowrd = foundUser.toJSON()
                delete userRemovePassowrd.password
                resolve(userRemovePassowrd);
            } else {
                reject(createError(400, 'Wrong Password'));
            }
        })
    })
}
const createUser = (data,res) =>{
    return new Promise((resolve,reject)=>{
        const findUname = User.findOne({
            where: {
                username:data.username
            }
        })
        const findEmail = User.findOne({
            where: {
                email:data.email
            }
        })
        let action = [findUname,findEmail]
        Promise.all(action).then(cb => {
            if(cb[0]) return res.json({error: 1001, message: 'username already registered!'})
            if(cb[1]) return res.json({error: 1003, message: 'email already registered'})
            return User.create(data)
        })
        .then(results => resolve(results))
        .catch(err=>reject(err))
        
    })
}

const validateEmail = (email) => {
    return email.match(
      /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    );
};

exports.findAll = async (req, res, next) => {
    try{
        const result = await User.findAll()
        res.json(result)
    } catch (error) {
       res.send(createError(400, error));
        next(error);
    }

    
}
exports.findId = async (req, res, next) => {
    try{
        const result = await User.findOne(
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
        const data = await User.destroy({
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