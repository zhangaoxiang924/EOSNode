/**
 * Author：tantingting
 * Time：2018/4/9
 * Description：Description
 */

const express = require('express')
const router = express.Router()
const utils = require('../utils/public')

const axiosAjax = utils.axiosAjax
const ajaxJavaUrl = utils.ajaxJavaUrl

/* GET home page. */
router.get('/', function (req, res, next) {
    /*
    * let newsId = req.query.id

     async function newsDetailData () {
     const data = await new Promise((resolve) => {
     let sendData = null
     if (!req.cookies.hx_user_token) {
     sendData = {id: newsId}
     } else {
     sendData = {
     id: newsId,
     passportId: req.cookies.hx_user_id,
     token: req.cookies.hx_user_token
     }
     }
     axiosAjax({
     type: 'GET',
     url: ajaxJavaUrl + '/info/news/getbyid',
     params: sendData,
     res: res,
     fn: function (resData) {
     resolve(resData)
     }
     })
     })

     return data
     }

     newsDetailData().then((resData) => {
     if (resData.code === 1) {
     res.render('eos-galaxy', {
     newsData: resData.obj,
     title: resData.obj.current.title
     })
     } else {
     res.render('error', {
     message: resData.msg,
     error: {
     status: resData.code,
     stack: 'Please pass the correct parameters.'
     }
     })
     }
     })
    * */
    res.render('eos-galaxy-m', {
        nav: [
            {name: '首页', path: 'home'},
            {name: '介绍', path: 'describe'},
            {name: '我们的贡献', path: 'donate'},
            {name: 'Galaxy生态', path: 'ecology'},
            {name: '团队', path: 'team'},
            {name: '联系我们', path: 'contact'}
        ],
        newsData: 132,
        title: 'eosGalaxy'
    })
})

module.exports = router
