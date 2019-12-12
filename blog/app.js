const Koa = require('koa'),
    router = require('koa-router')(),
    render = require('koa-art-template'),
    path = require('path'),
    static = require('koa-static'),
    koaBody = require('koa-body'),
    fs = require('fs'),
    session = require('koa-session'),
    mSql = require('./lib/DB'),
    cors = require('./lib/cors'),
    guid = require('uuid/v4')

//////////////////////////////////////////////////////////////////////
console.log(guid())
//全局全局变量
global.host = 'http://localhost:8081';

global.rootpath = __dirname;

//实例化koa对象
const app = new Koa();


//解决跨域问题
app.use(cors)

router.use('/api', require('./routes/Api'))


//配置koaBody
app.use(koaBody({
    multipart: true,
    formidable: {
        maxFileSize: 200 * 1024 * 1024
    }
}))
router.get('/', async (ctx) => {

    ctx.body = '网站首页'

})
//404
router.get('*', async (ctx) => {

    ctx.body = '404页面不存在!'

})

//////////////////////////////////////////////////////////////////////

//配置路由
app
    .use(router.routes())
    .use(router.allowedMethods())

//监听端口
app.listen(8081, () => {
    console.log('Server running at loalhost:8081')
});