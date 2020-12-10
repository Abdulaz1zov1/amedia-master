const express = require('express');
const app = express();
const PORT = process.env.PORT || 5000;
const dotenv = require('dotenv');
const path = require('path').join(__dirname, '/public/uploads')

const morgan = require('morgan');
const cors = require('cors');

const cookieParser = require('cookie-parser');
const connectDB = require('./config/db');
const errorHandler = require('./middlewares/error');


app.use('/public/uploads', express.static(path))


// Load env vars
dotenv.config({path : './config/config.env'})

// Connect DB
connectDB();

app.use(express.json());    
app.use(express.urlencoded({extended : true}));
app.use('/public/uploads', express.static(path));
app.use(cookieParser());
app.use(cors({ rogin : "*" }));
// Dev logging middlewares
if(process.env.NODE_ENV === 'developer'){
    app.use(morgan('dev'));
} 


app.get('/',(req,res)=>{
    res.redirect('http://amediatv.uz')
})
//Mount routes
app.use('/api/auth' , require('./routes/auth'));
app.use('/api/users' , require('./routes/users'));
app.use('/api/category' , require('./routes/categories'));
app.use('/api/janr' , require('./routes/janr'));
app.use('/api/kino' , require('./routes/kino'));
app.use('/api/season' , require('./routes/season'));
app.use('/api' , require('./routes/search'));
app.use('/api/slider' , require('./routes/slider'));
app.use('/api/home' , require('./routes/ui'));
app.use('/api/news' , require('./routes/news'));
app.use('/api/anotatsiya' , require('./routes/anotatsiya'));
app.use('/api/member' , require('./routes/member'));
app.use('/api/rate' , require('./routes/rating'));
app.use('/api/comment' , require('./routes/comment'));
app.use('/api/video' , require('./routes/video'));
//app.use('/api/payment' , require('./routes/payment'));

app.use(errorHandler);

const server = app.listen(PORT , 
    console.log(`Server is running in ${process.env.NODE_ENV} mode on port ${PORT}`.white.bold));

// Handle unhanled promise rejection
process.on('unhandledRejection' , (err , promise) => {
    console.log(`Error : ${err.message}`);
    // Close server and exit process
    server.close(() => process.exit(1));
});
