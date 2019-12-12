const router = require('koa-router')(),
  mSql = require('../../lib/DB'),
  confing = require('../../config'),
  guid = require('uuid/v4')

router.get('/gettitle', async (ctx) => {

  let sql = "SELECT title FROM navtitle";
  let res = await mSql.query(sql);
  ctx.body = res
})

router.post('/reg', async (ctx) => {
  let { name, tel, pwd } = ctx.request.body
  // console.log(name, tel, pwd)

  //验证用户名的正则
  var reg = /^[a-zA-Z][a-zA-Z0-9]{3,15}$/;
  //验证密码的正则
  var reg1 = /^[a-zA-Z0-9]{6,10}$/;
  //验证手机号的正则
  var regMobile = /^1\d{10}$/;
  if (reg.test(name) && reg1.test(pwd) && regMobile.test(tel)) {
    let sql = "INSERT INTO userstable (name,tel,pwd) VALUES ('" + name + "','" + tel + "','" + pwd + "')";
    await mSql.query(sql);
    ctx.body = { err: 0, msg: '成功' }
  } else {
    ctx.body = { err: 1, msg: '失败' }
  }
})


router.post('/login', async (ctx) => {
  let { name, pwd } = ctx.request.body;

  let rows = await mSql.query(`SELECT * FROM userstable WHERE name = '${name}' AND pwd='${pwd}'`)
  if (rows.length == 0) {
    ctx.body = { err: 1, msg: '没有此用户，请先注册' }
  } else {
    let row = rows[0]

    if (row.pwd != pwd) {
      ctx.body = { err: 1, msg: '密码不正确' }
    } else {
      token = guid().replace(/\-/g, "");
      token_expires = Math.floor((Date.now() + confing.TOKEN_AGE) / 1000)


      await mSql.query(`UPDATE userstable SET token='${token_expires}'`)

      ctx.body = { err: 1, token }
    }

  }
})

router.post('/publish', async (ctx) => {
  let post = ctx.request.body
  //初始化
  let imgUrls = '';
  // 封面
  let photo = post.photo;
  if (photo.content) {
    imgUrls = photo.content
  }
  let { name, content, catalogs, acthor } = ctx.request.body
  let date = new Date();
  let dt = date.valueOf();
  if (imgUrls) {
    let sql = `INSERT INTO border (btitle,acthor,type,dt,pl,dz,covr) VALUES ('${name}','${acthor}','${catalogs}','${dt}','?','?','${imgUrls}')`;
    await mSql.query(sql)
    let aql = `INSERT INTO bcontent (content) VALUES ('${content}')`;
    await mSql.query(aql);
    ctx.body = { err: 0, msg: '上传成功' }
  } else {
    let sql = `INSERT INTO border (btitle,acthor,type,dt,pl,dz,covr) VALUES ('${name}','${acthor}','${catalogs}','${dt}','?','?','')`;
    await mSql.query(sql)
    let aql = `INSERT INTO bcontent (content) VALUES ('${content}')`;
    await mSql.query(aql);
    ctx.body = { err: 0, msg: '上传成功' }
  }
})



router.post('/popular', async (ctx) => {
  if (ctx.request.body.sort) {
    let title = ctx.request.body.sort
    if (title == 'popular') {
      let sql = `SELECT * FROM border WHERE dz > 40`;
      let data = await mSql.query(sql)
      ctx.body = { data, err: 0, msg: '成功' }
    }

    if (title == 'new') {
      let sql = `SELECT * FROM border WHERE dt = 2147483647`;
      let data = await mSql.query(sql)
      ctx.body = { data, err: 0, msg: '成功' }
    }

    if (title == 'host') {
      let sql = `SELECT * FROM border WHERE pl > 20`;
      let data = await mSql.query(sql)
      ctx.body = { data, err: 0, msg: '成功' }
    }

  }


  if (ctx.request.body.val) {
    let title = ctx.request.body.val
    //定义搜索接口
    if(title){
      // let sql = `SELECT * FROM border WHERE FIND_IN_SET('${title}',type)`;
      let sql = `SELECT * FROM border WHERE btitle like '%${title}%'`;
      let data = await mSql.query(sql)
      ctx.body = { data, err: 0, msg: '成功' }
    }
    if (title == 'html') {

      let sql = `SELECT * FROM border WHERE type = '${title}'`;
      let data = await mSql.query(sql)
      ctx.body = { data, err: 0, msg: '成功' }
    }

    if (title == 'Css') {

      let sql = `SELECT * FROM border WHERE type = '${title}'`;
      let data = await mSql.query(sql)
      ctx.body = { data, err: 0, msg: '成功' }
    }


    if (title == 'javascript') {

      let sql = `SELECT * FROM border WHERE type = '${title}'`;
      let data = await mSql.query(sql)
      ctx.body = { data, err: 0, msg: '成功' }
    }

    if (title == 'Vue.js') {

      let sql = `SELECT * FROM border WHERE type = '${title}'`;
      let data = await mSql.query(sql)
      ctx.body = { data, err: 0, msg: '成功' }
    }

    if (title == 'react.js') {

      let sql = `SELECT * FROM border WHERE type = '${title}'`;
      let data = await mSql.query(sql)
      ctx.body = { data, err: 0, msg: '成功' }
    }

    if (title == 'angular.js') {

      let sql = `SELECT * FROM border WHERE type = '${title}'`;
      let data = await mSql.query(sql)
      ctx.body = { data, err: 0, msg: '成功' }
    }

    if (title == 'node.js') {

      let sql = `SELECT * FROM border WHERE type = '${title}'`;
      let data = await mSql.query(sql)
      ctx.body = { data, err: 0, msg: '成功' }
    }

    if (title == 'TypeScript') {

      let sql = `SELECT * FROM border WHERE type = '${title}'`;
      let data = await mSql.query(sql)
      ctx.body = { data, err: 0, msg: '成功' }
    }

    if (title == 'koa2') {

      let sql = `SELECT * FROM border WHERE type = '${title}'`;
      let data = await mSql.query(sql)
      ctx.body = { data, err: 0, msg: '成功' }
    }

    if (title == 'less') {

      let sql = `SELECT * FROM border WHERE type = '${title}'`;
      let data = await mSql.query(sql)
      ctx.body = { data, err: 0, msg: '成功' }
    }
    if (title == 'mySql') {

      let sql = `SELECT * FROM border WHERE type = '${title}'`;
      let data = await mSql.query(sql)
      ctx.body = { data, err: 0, msg: '成功' }
    }
    if (title == '微信小程序') {

      let sql = `SELECT * FROM border WHERE type = '${title}'`;
      let data = await mSql.query(sql)
      ctx.body = { data, err: 0, msg: '成功' }
    }
  }




})


router.post('/details', async (ctx) => {
  let { name, id } = ctx.request.body
  if (typeof id == 'number') {
    let sql = `SELECT bcontent.content FROM bcontent LEFT JOIN border ON (bcontent.cid = border.id) WHERE border.id='${id}'`;
    let data = await mSql.query(sql)
    ctx.body = { data, err: 0, msg: '成功' }
  } else {
    ctx.body = { err: 1, msg: '失败' }
  }
})
module.exports = router.routes();