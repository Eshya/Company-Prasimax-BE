const initModels = require("../../model/init-models");
const db = require('../../../config/db.config')
const passwordHash = require('password-hash');
const User = initModels(db.sequelize).user
const crypto = require('crypto')
const path = require('path')
const nodemailer = require('nodemailer')
const hbs = require('nodemailer-express-handlebars')
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
const mailOptions = {
    from: 'donotreply@prasimax.com',
  }
  const smtpTransport = nodemailer.createTransport({
    host: "srv127.niagahoster.com",
    tls: {
        rejectUnauthorized: false
    },
    port: 465,
    auth: {
      user: 'donotreply@prasimax.com',
      pass: 'Company123!@#',
    }
  })
const handlebarOptions = {
    viewEngine: {
        partialsDir: path.resolve(`${process.cwd()}/template/`),
        defaultLayout: false,
    },
    viewPath: path.resolve(`${process.cwd()}/template/`),
};
const getProtocol = (req) => {
    var proto = req.connection.encrypted ? 'https' : 'http';
    // only do this if you trust the proxy
    proto = req.headers['x-forwarded-proto'] || proto;
    return proto.split(/\s*,\s*/)[0];
  }
exports.register = async (req, res, next) => {
    let {fullname, username, email, phoneNumber, password, alamat, perusahaan, profesi,isSubscribe} = _beforeSave(req.body);
    let result = []
    try {
        // console.log(req.body)
        const randomText = await crypto.randomBytes(20);
        const token = randomText.toString('hex');
        const protocol = getProtocol(req)
        const url = `${protocol}://${req.get('host')}/api/user/activate-email?token=${token}`
        smtpTransport.use('compile', hbs(handlebarOptions))
        mailOptions.to = email
        mailOptions.subject = '[No-Reply] Aktivasi Akun '
        mailOptions.template = 'activate-email';
        mailOptions.context = {
            name: username,
            url
        }
        const isSent = await smtpTransport.sendMail(mailOptions)
        if(!isSent) return next(createError(500, 'Gagal mengirimkan email aktivasi'))
        let userResult= await createUser({fullname,username,email,phoneNumber,password,alamat,perusahaan,profesi,
            Activatedtoken:token},res)
        
        result.push(userResult)
        res.json({
          data: result,
          message: 'Ok'
        })
    } catch(err){
        res.send(createError(400, error));
        next(err)
    }
}

exports.activate = async (req, res, next) =>{
    try{
        
        const isInvalid = await User.findOne({resetPasswordToken: req.query.token});
        
        if (!isInvalid) return res.send(createError(403, 'Token tidak valid'))
        await User.update({isActive: true, Activatedtoken: null},{where:{id:isInvalid.id}});
        smtpTransport.use('compile', hbs(handlebarOptions))

        mailOptions.to = isInvalid.email
        mailOptions.subject = `[No-Reply] Akun Telah Diaktivasi`
        mailOptions.template = 'activated'
        mailOptions.context = {
            name: isInvalid.username,
            password: req.body.password
        }
        const isSent = await smtpTransport.sendMail(mailOptions)
        if(!isSent) return res.send(createError(500, 'Gagal mengirimkan email aktivasi akun'))
        res.json({
            message: `Permintaan aktivasi [${isInvalid.email}] berhasil`
        })
    }
    catch(error){
        res.send(createError(400, error));
        next(error)
    }
    
      
}
exports.resend = async (req, res, next) =>{
    try{
        const isInvalid = await User.findOne({email: req.params.email});
        
        if (!isInvalid) return res.send(createError(403, 'email tidak valid'))
        const randomText = await crypto.randomBytes(20);
        const token = randomText.toString('hex');
        await User.update({Activatedtoken: token},{where:{id:isInvalid.id}});
        
        const protocol = getProtocol(req)
        const url = `${protocol}://${req.get('host')}/api/user/activate-email?token=${token}`
        
        smtpTransport.use('compile', hbs(handlebarOptions))
        mailOptions.to = req.params.email
        mailOptions.subject = '[No-Reply] Aktivasi Akun '
        mailOptions.template = 'activate-email';
        mailOptions.context = {
            name: isInvalid.username,
            url
        }
        const isSent = await smtpTransport.sendMail(mailOptions)
        if(!isSent) return res.send(createError(500, 'Gagal mengirimkan email aktivasi'))
        res.json({
            message: `Permintaan aktivasi [${req.params.email}] berhasil dikirim ulang`
        })
    }
    catch(error){
        res.send(createError(400, error));
        next(error)
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
            if (foundUser === null && !validateEmail(username)) return reject(createError(401, 'Username not found!'));
            if (foundUser === null) return reject(createError(401, 'Username or Email not found!'));
            if (!foundUser.isActive) return reject(createError(401, 'Email Not Activated!'));
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