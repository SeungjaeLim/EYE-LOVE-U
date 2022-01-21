const express = require('express');
const cors = require('cors');
const app = express();
const port = 8080;
const authRouter = require('./controller/authController')
const imgRouter = require('./controller/imgController.js');

app.use(express.urlencoded({extended: true}));
app.use(express.json());
app.use(cors());

//기본 페이지
app.use('/auth',authRouter);
app.use('/api',imgRouter);

app.listen(port, () => {
    console.log(`server is listening at localhost:${port}`);
});