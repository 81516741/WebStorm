var express = require('express');
var router = express.Router();

var mongoose = require('mongoose');
var Goods = require('../models/goods');
var User = require('../models/user');

//连接MongoDB数据库
mongoose.connect('mongodb://127.0.0.1:27017/mall');

mongoose.connection.on("connected", function () {
    console.log("MongoDB connected success.")
});

mongoose.connection.on("error", function () {
    console.log("MongoDB connected fail.")
});

mongoose.connection.on("disconnected", function () {
    console.log("MongoDB connected disconnected.")
});


/* GET users listing. */
router.get('/list', function (req, res, next) {
    let page = parseInt(req.param('page'));
    let pageSize = parseInt((req.param('pageSize')));
    let priceLevel = req.param('priceLevel');
    let sort = req.param('sort');
    let skip = pageSize * (page - 1);
    let priceGt = '';
    let priceLte = '';
    let params = {};
    if (priceLevel != 'all') {
        switch (priceLevel) {
            case '0':priceGt = '0',priceLte = '4'; break;
            case '1':priceGt = '4',priceLte = '8'; break;
            case '2':priceGt = '8',priceLte = '17'; break;
        }
        params = {
            salePrice:{
                $gt:priceGt,
                $lte:priceLte
            }
        }
    }
    console.log('我收到数据了');
    let goodsModel = Goods.find(params).skip(skip).limit(pageSize);
    goodsModel.sort({'salePrice':sort});
    goodsModel.exec((err, doc) => {
            if (err) {
                res.json({
                    'status': '1',
                    'msg': err.message
                })
            } else {
                res.json({
                    'status': '0',
                    'msg': '',
                    'result': {
                        'len': doc.length,
                        'list': doc
                    }
                })
            }
        }
    );
    // Goods.ex({},(error,doc)=>{})
});

//加入到购物车
router.post("/addCart", function (req,res,next) {
    var userId = '111111',productId = req.body.productId;
    User.findOne({userId:userId}, (err,userDoc)=> {
        if(err){
            res.json({
                status:"1",
                msg:err.message
            })
        }else{
            console.log("userDoc:"+userDoc);
            if(userDoc){
                var goodsItem = '';
                userDoc.cartList.forEach(function (item) {
                    if(item.productId == productId){
                        goodsItem = item;
                        item.productNum ++;
                    }
                });
                if(goodsItem){
                    userDoc.save(function (err2,doc2) {
                        if(err2){
                            res.json({
                                status:"1",
                                msg:err2.message
                            })
                        }else{
                            res.json({
                                status:'0',
                                msg:'',
                                result:'suc'
                            })
                        }
                    })
                }else{
                    Goods.findOne({productId:productId}, function (err1,doc) {
                        if(err1){
                            res.json({
                                status:"1",
                                msg:err1.message
                            })
                        }else{
                            if(doc){
                                doc.productNum = 1;
                                doc.checked = 1;
                                userDoc.cartList.push(doc);
                                userDoc.save(function (err2,doc2) {
                                    if(err2){
                                        res.json({
                                            status:"1",
                                            msg:err2.message
                                        })
                                    }else{
                                        res.json({
                                            status:'0',
                                            msg:'',
                                            result:'suc'
                                        })
                                    }
                                })
                            }
                        }
                    });
                }
            }
        }
    })
});


module.exports = router;