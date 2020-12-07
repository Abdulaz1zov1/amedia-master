const mongoose = require('mongoose');
// 'mongodb+srv://King_Jewel:Dyb@l@_1997@cluster0.j8ivb.gcp.mongodb.net/anibla-project'
const connectDB = async () => {
   try{ const conn = await mongoose.connect(process.env.MONGO_URI , {
        useNewUrlParser: true,
        useFindAndModify: true,
        useCreateIndex: true,
        useUnifiedTopology: true
    })
    console.log(`MongoDB connected : ${conn.connection.host}`.cyan.underline.bold);}
    catch (err) {
        console.log('XATO ====>' , err);
    }
}

module.exports = connectDB;