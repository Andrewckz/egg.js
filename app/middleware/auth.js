module.exports = (option,app) => {
    return async function auth(ctx,next){
    //添加全局变量
        ctx.state.csrf = ctx.csrf;
        await next();
    }
}