const mongoose = require('mongoose');


async function connect() {
    try {
        await mongoose.connect("mongodb://localhost:27017/myNodeJs")
            .then(function() {console.log("Kết nối database thành công!")})
    } catch (error){
        console.log(`kết nối thất bại. lỗi ${error}`);
    }
}

module.exports = {connect}