const router = require('express').Router();
const conn = require('../config/mysql') 
const db = conn.init() 
conn.open(db)

const passportConfig = { usernameField: 'userId', passwordField: 'password' };

router.post('/', (req, res) => {
    
    console.log(req.body);
    res.send('This is register page');
});

router.post('/login', (req, res) => {
    // user_id, user_pw 변수로 선언
    const user_id = req.body.user_id
    const password = req.body.password
    // 입력된 id 와 동일한 id 가 mysql 에 있는 지 확인
    const sql1 = `SELECT COUNT(*) AS result FROM user WHERE user_id = '${user_id}'`
    db.query(sql1, (err, data) => {
        if(!err) {
            // 결과값이 1보다 작다면(동일한 id 가 없다면)
            if(data[0].result < 1) {
                res.send({ 'msg': '입력하신 id 가 일치하지 않습니다.'})
            } else { // 동일한 id 가 있으면 비밀번호 일치 확인
                const sql2 = `SELECT 
                CASE (SELECT COUNT(*) FROM user WHERE user_id = '${user_id}' AND password = '${password}')
                WHEN '0' THEN NULL
                ELSE (SELECT user_id FROM user WHERE user_id = '${user_id}' AND password = '${password}')
                END AS userId
                , CASE (SELECT COUNT(*) FROM user WHERE user_id = '${user_id}' AND password = '${password}')
                WHEN '0' THEN NULL
                ELSE (SELECT password FROM user WHERE user_id = '${user_id}' AND password = '${password}')
                END AS userPw`;
                db.query(sql2, (err, data) => {
                    console.log(data[0]);
                    if(!err) {
                        if(data[0].userId==undefined){
                            res.send({ 'msg': '입력하신 id 가 일치하지 않습니다.'})
                        }
                        else {
                            res.send(data[0])
                        }
                    } else {
                        res.send(err)
                    }
                })
            }
        } else {
            res.send(err)
        }
    })
});

router.post('/register', (req, res) =>{
    // user_id, user_pw 변수로 선언
    const user_id = req.body.user_id
    const password = req.body.password
    const profileImg = req.body.profileImg
    const ismale = req.body.ismale?1:0
    const phone = req.body.phone

    console.log(req.body);
    // 입력된 id 와 동일한 id 가 mysql 에 있는 지 확인
    const sql1 = `SELECT COUNT(*) AS result FROM user WHERE user_id = '${user_id};'`
    db.query(sql1, (err, data) => {
        if(!err) {
        	// 결과값이 1보다 작다면(동일한 id 가 없다면)
            if(data[0].result > 0) {
                res.send({ 'msg': '사용 할 수 없는 ID입니다'})
            } else { // 동일한 id 가 있으면 비밀번호 일치 확인
                const sql2 = `INSERT INTO user (user_id, password, profileImg, ismale, phone) VALUES ('${user_id}', '${password}', '${profileImg}', '${ismale}', '${phone}');`;
                db.query(sql2, (err, data) => {
                    if(!err) {
                       res.send({ 'msg': '회원가입 완료'})
                    } else {
                        res.send(err)
                    }
                })
            }
        } else {
            res.send(err)
        }
    })
});
router.get('/info',(req, res)=> {
    console.log(req.query.user_id)
    const user_id = req.query.user_id
    if(user_id==undefined){
        res.send({ 'msg':  '리퀘스트좀 제대로 날려라'})
    }
    const sql1 = `SELECT * FROM user WHERE user_id = '${user_id}';`
    db.query(sql1, (err, data) => {
        if(!err) {
            console.log(data[0])
            let sex = '남'
            if(data.ismale == 0){
                sex = '여'
            }
            res.json({
                'id' : `${user_id}`,
                'sex' : sex,
                'phoneNumber' : data[0].phone 
            })
        } 
        else {
            res.send(err)
        }
    })
});

router.get('/random',(req, res)=> {
    const gender = req.query.gender?1:0
    console.log(gender)
    
    // const sql1 = `SELECT * FROM user WHERE user_id = '${user_id}';`
    // db.query(sql1, (err, data) => {
        // if(!err) {
            res.json({
                'id_1' : `Hong`,
                'id_2' : `Hong1`,
                'id_3' : `junyoung`,
                'id_4' : `test12`,
            })
        // } 
        // else {
            // res.send(err)
        // }
    // })
});

module.exports = router;