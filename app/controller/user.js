'use strict';
const _ = require('lodash');
const Controller = require('egg').Controller;

class UserController extends Controller {
    async index() {
        await this.ctx.render('user');
    }
    async registerindex() {
        await this.ctx.render('register');
    }
    async login() {
        const ctx = this.ctx;
        let params = ctx.request.body;
        let username = params.username;
        let password = params.password;
        let result = await this.service.user.getUserInfo(ctx, username, password);
        console.log(result);
        if(!_.isEmpty(result)){
            console.log('成功')
             ctx.body = {
                code:200,
                user:result.username,
                token:result.token
            }
        }else{
            console.log('失败')
            ctx.body = {
                code:500,
                msg:'用户不存在或密码错误'
            }
        }
    }

    async user() {
        const ctx = this.ctx;
        let token = ctx.request.body.token;
        let user = await ctx.model.User.find({
            attributes:['username'],
            where:{
                token:token,
            }
        });
        if(!_.isEmpty(user)){
            ctx.body = {
                code:200,
                user:user.username
            }
        }else{
            ctx.body = {
                code:500,
                msg:'用户不存在或密码错误'
            }
        }
    }

    async register() {
        const ctx = this.ctx;
        let params = ctx.request.body;
        let username = params.username;
        let password = params.password;
        let repeat_password = params.repeat_password;
        if(!password){
            return ctx.body = {
                code:500,
                msg:'密码不能为空'
            }
        }
        if(password !== repeat_password){
            return ctx.body = {
                code:500,
                msg:'两次密码不一致'
            }
        }
        let result  = await this.service.user.CreatUser(ctx, username, password);

        if(!_.isEmpty(result)){
            ctx.body = {
                code:200,
                user:result
            }
        }else{
                ctx.body = {
                    code:500,
                    msg:'失败'
                }
        }

    }
    async changepwd() {
        const ctx = this.ctx;
        let params = ctx.request.body;
        let token = params.token;
        let newpwd = params.password;
        let result  = await this.service.user.ChangePwd(ctx, newpwd, token);
        if(!_.isEmpty(result)){
            ctx.body = {
                code:200
            }
        }else{
            ctx.body = {
                code:500,
                msg:'操作失败'
            }
        }
    }
}

module.exports = UserController;