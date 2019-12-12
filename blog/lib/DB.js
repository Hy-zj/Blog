
const mysql = require('mysql'),
      dbConfig = require('./db.config'),
      fs = require('fs'),
      path = require('path');

class DB {

    constructor(){

         //连接池
         var pool = mysql.createPool({
            host:dbConfig.host,
            user:dbConfig.user,
            password:dbConfig.password,
            database:dbConfig.database
        })

        //数据库连接
        this.conn = this.init(pool);

    }

    //初始化
    init(pool){

        //连接数据库
        return new Promise((resolve,reject) =>{

            pool.getConnection((err,conn) =>{

                if (err){
                    reject(err)
                } else {
                    resolve(conn);
                }

            })

        })
    }

    //执行语句
    async query(sql){

        let conn = await this.conn;
        
            return new Promise((resolve,reject) =>{

                if (sql){

                    conn.query(sql,(err,res) =>{

                        if (err){
                            reject(err)
                        } else {
                            resolve(res)
                        }
                    })

                } else {

                    reject('缺少参数')

                }

            })

    }


    // 文件上传
    upload(files){

        //初始化
        let urlStr = '';

        if (files.length>0){

            //遍历数组
            for(let i=0;i<files.length;i++){

                //文件
                let file = files[i];

                 //创建可读流
                const readFile = fs.createReadStream(file.path);

                //随机数
                let rand = parseInt(Math.random()*100);

                //重命名文件名
                let myDate = new Date();
                let newFileName = myDate.getTime()+rand; //时间戳

                //扩展名
                let tmp = file.name.split('.');
                let extension = tmp[tmp.length-1];

                //完整的服务器上的文件地址
                let dstPath = rootpath+'/public/uploads/'+newFileName+'.'+extension;

                //创建可写入流
                const writeFile = fs.createWriteStream(dstPath);

                //通过管道写入文件
                readFile.pipe(writeFile)

                //返回地址
                urlStr += 'uploads/' + newFileName+'.'+extension+',';


            }

            return urlStr;

            
        }

    }

    //上传单文件
    uploadOne(file) {
        //初始化
        let urlStr = '';
        if (file) {
            //创建可读流
            const readFile = fs.createReadStream(file.path)
            //随机数
            let rand = parseInt(Math.random() * 100);
            //重命名文件名
            let myDate = new Date();
            //获取时间戳
            let newFileName = myDate.getTime() + rand;
            //扩展名 
            let temp = file.name.split('.');
            let extension = temp[temp.length - 1];
            //完整的服务器上的文件地址
            let dstPath = rootpath + '/public/uploads/' + newFileName + '.' + extension;
            //创建可写入流
            const writeFile = fs.createWriteStream(dstPath);
            //通过管道写入文件
            readFile.pipe(writeFile);
            //返回地址
            urlStr = 'uploads/' + newFileName + '.' + extension;

            return urlStr;

        }
    }

}

//实例化对象
var mydb = new DB();

//暴露对象
module.exports = mydb;
