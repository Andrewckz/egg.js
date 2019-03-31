'use strict';
const _ = require('lodash');
const Service = require('egg').Service;
const utils = require('../lib/utils');

class UserService extends Service {
    async getUserInfo(ctx, username, password) {
        if(!username || !password){
            return {}
        }
        let pwd = utils.md5(password);
        let user = await ctx.model.User.find({
            attributes:['username','token'],
            where:{
                username:username,
                password:pwd
            }
        });
        return user|| {};
    }
    async CreatUser(ctx, username, password) {
        if(!username || !password){
            return {}
        }
        let pwd = utils.md5(password);
        let token = utils.md5(username + password);
        let result = await ctx.model.User.create({
            username: username,
            password: pwd,
            token: token
        });
        if(!_.isEmpty(result)){
            let user = {
                username:username,
                token:token
            }
            return user;
        }
        return {};
    }
    async ChangePwd(ctx, newpwd, token) {
        if(!newpwd){
            return {}
        }
        let user = await ctx.model.User.find({
            attributes:['username','password'],
            where:{token:token}
        });
        let result = await ctx.model.User.update(
            {password: utils.md5(newpwd)},
            {where: {token:token}
            });
        return result;
    }
}

module.exports = UserService;