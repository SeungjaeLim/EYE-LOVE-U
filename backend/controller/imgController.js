const express = require('express');
const multer = require('multer');
const fs = require('fs');
const path = require('path');
const conn = require('../config/mysql') 
const db = conn.init() 
conn.open(db)

const router = express.Router();

fs.readdir('uploads', (error) => {
    // uploads 폴더 없으면 생성
    if (error) {
        fs.mkdirSync('uploads');
    }
})

const upload = multer({
    storage: multer.diskStorage({
        destination(req, file, cb) {
            cb(null, 'uploads/');
        },
        filename(req, file, cb) {
            const ext = path.extname(file.originalname);
            cb(null, path.basename(file.originalname, ext) + Date.now() + ext);
        },
    }),
    limits: { fileSize: 5 * 1024 * 1024 },
});
// 이미지 업로드를 위한 API
// upload의 single 메서드는 하나의 이미지를 업로드할 때 사용
router.post('/upload', upload.single('file'), (req, res) => {
    console.log(req.file);
    res.json({ url : `${req.file.filename}`});
});

router.get('/download',(req, res)=> {
    console.log(req.query.user_id)
    const user_id = req.query.user_id
    if(user_id==undefined){
        res.send({ 'msg':  '리퀘스트좀 제대로 날려라'})
    }
    const sql1 = `SELECT profileImg FROM user WHERE user_id = '${user_id}';`
    // console.log(data)
    db.query(sql1, (err, data) => {
        if(!err) {
            console.log(data[0].profileImg)
            const dir = 'eyeloveyou_back/uploads',
            file = data[0].profileImg;
      
            res.sendfile(dir + '/' + file, {'root': '../'});
        } 
        else {
            res.send(err)
        }
    })
});

module.exports = router;