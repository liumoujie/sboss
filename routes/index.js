/**
 * Created by zhoulanhong on 5/24/16.
 */
var app = require('express');
var router = app.Router();

var index = function (passport) {
    console.log("-----" + passport);
    router.post('/login', function (req, res, next) {

        if (!req.body.username)
            return res.send({status: 500, msg: '用户名不能为空'});

        if (!req.body.password)
            return res.send({status: 500, msg: '密码不能为空'});

        console.log("------------ /admin/login  ---------");
        console.log("req body:" + JSON.stringify(req.body));


        passport.authenticate('login', function (err, user, info) {
            console.log(">>>> err  = ", err);
            console.log(">>>> user = ", user);
            console.log(">>>> info = ", info);

            //取出错误信息
            var message = null;
            var messageAry = req.flash('message');
            if (messageAry && messageAry.length > 0) {
                message = messageAry[0];
            }

            console.log(message);

            if (err) {
                return next(err);
            }

            if (!user) {
                return res.send({
                    status: 500,
                    errorMsg: message
                })
            } else {
                req.logIn(user, function (err) {
                    if (err) {
                        return next(err);
                    }
                    return res.send('you login success');
                });
            }
        })(req, res, next);

    });

    router.get('/logout',function (req, res, next) {
        req.logout();
        res.send("logout success");
    });

    return router;
}
module.exports = index;