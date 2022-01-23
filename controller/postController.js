const router = require('express').Router();
const conn = require('../config/mysql') 
const db = conn.init() 
conn.open(db)

const passportConfig = { usernameField: 'userId', passwordField: 'password' };

router.post('/', (req, res) => {
    
    console.log(req.body);
    res.send('This is post page');
});

router.post('/send', (req, res) => {
    // user_id, user_pw 변수로 선언
    const sender = req.body.sender
    const reciever = req.body.reciever
    const content = req.body.content
    console.log(req.body)
    // 입력된 id 와 동일한 id 가 mysql 에 있는 지 확인
    const sql1 = `INSERT INTO mailbox (sender, reciever, content) VALUES ('${sender}', '${reciever}', '${content}');`
    db.query(sql1, (err, data) => {
        if(!err) {
            res.send({msg:'전송 완료'})
        } else {
            res.send(err)
        }
    })
});

router.get('/sent',(req, res)=> {
    console.log(req.query.user_id)
    const user_id = req.query.user_id
    if(user_id==undefined){
        res.send({ 'msg':  '리퀘스트좀 제대로 날려라'})
    }
    const sql1 = `SELECT * FROM mailbox WHERE sender = '${user_id}';`
    db.query(sql1, (err, data) => {
        if(!err) {
        
            res.send(data)
        } 
        else {
            res.send(err)
        }
    })
});
router.get('/inbox',(req, res)=> {

    console.log(req.query.user_id)
    const user_id = req.query.user_id
    if(user_id==undefined){
        res.send({ 'msg':  '리퀘스트좀 제대로 날려라'})
    }
    const sql1 = `SELECT * FROM mailbox WHERE reciever = '${user_id}';`
    db.query(sql1, (err, data) => {
        if(!err) {
        
            res.send(data)
        } 
        else {
            res.send(err)
        }
    })
});

module.exports = router;