const express = require('express'); //tích hợp express vào
const expressSession = require('express-session');

const { engine } = require('express-handlebars');
const morgan = require('morgan')
const methodOverride = require('method-override');
const app = express(); //tạo một biến chính
const port = 3000; //tạo một cổng host
const route = require('./routers');
const path = require('path');
const database = require('./config/mongodb');
const middleWareAuthor = require('./config/author');






//body parser
app.use(express.urlencoded({
    extended: true
}));

//static file
app.use(express.static(path.join(__dirname, 'public')));

app.use(expressSession({
    secret: 'secret-key', // Chuỗi bí mật để ký và mã hóa session ID
    resave: false, // Không lưu lại session nếu không có sự thay đổi
    saveUninitialized: false // Không tạo session nếu không có dữ liệu được lưu
}));


  
//dùng các middleWare tự tạo
app.use(middleWareAuthor);

//nạp và sử dụng morgan
app.use(morgan('combined'))

//sử dụng method ảo
app.use(methodOverride('_method'));

app.engine('hbs', engine({
    extname: '.hbs',
    helpers: {
        sum: (a, b) => a + b,
    }
}));
app.set('view engine', '.hbs');
app.set('views', path.join(__dirname, 'resources/views'));


//kết nối database
database.connect();
//đưa app và làm đối số cho route
route(app);


//lắng nghe địa chỉ của port(ở đây là localhost)
app.listen(port, () => {
    console.log(`listen to http://localhost:${port}`);
})