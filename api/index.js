const express = require('express')
const app = express()

const cookieParser = require('cookie-parser')
const session = require('express-session')
const multer = require('multer')
const path = require('path')

const userRouter = require('./router/user.router')
    , productRouter = require('./router/product.router')
    , catalogRouter = require('./router/catalog.router')
    , joinCatalogRouter = require('./router/join_catalog.router')
    , fileLoadRouter = require('./router/file.router')

app.use(express.json());
app.use(cookieParser());

app.use(session({
    secret: "Shh, its a secret!"
}));


app.use('/', express.static(__dirname + '/public'));
app.use('/', express.static(__dirname + '/public/img/'));
app.use('/', express.static(__dirname + '/public/file/'));
app.use('/', express.static(__dirname + '/public/video/'));


const storage = multer.diskStorage({
    destination(req, file, cb) {
        cb(null, 'public/img')
    },
    filename(req, file, cb) {
        cb(null, new Date().valueOf() + file.originalname)
    }
})
const limits = {
    fileSize: 1024 * 1024 * 5
}

const upload = multer({ storage, limits })


app.use('/api', userRouter)
app.use('/api', productRouter)

app.use('/api', catalogRouter)
app.use('/api', joinCatalogRouter)

app.use('/load', upload.single("filedata"), fileLoadRouter)

app.get('/', (req, res) => {
    if (req.session.page_views) {
        req.session.page_views++;
        res.send("You visited this page " + req.session.page_views + " times");
    } else {
        req.session.page_views = 1;
        res.send("Welcome to this page for the first time!");
    }
});

app.get('/load', (req, res) => {
    let file = __dirname + '/public/file/filefordowload.exe'
    res.download(file)

})




app.get('/home', (req, res) => {
    res.json("Welcome to bezkoder application.");
})
export default app