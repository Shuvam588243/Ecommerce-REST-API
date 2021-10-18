require('dotenv').config();
const express = require('express');
const app = express();
const port = process.env.PORT || 3000

//modules
const DB = require('./config/conn');

//Routes
const UserRoutes = require('./routes/Users');
const AdminRoutes = require('./routes/Admin');
const CategoryRoutes = require('./routes/Category');
const ProductRoutes = require('./routes/Product')




//middlewares
app.use(express.json());
app.use(express.urlencoded({ extended : true }));
app.use('/api/user', UserRoutes);
app.use('/api/admin', AdminRoutes);
app.use('/api/category', CategoryRoutes);
app.use('/api/product',ProductRoutes);

app.get('/',(req,res)=>{
    res.json({ msg : "Setup Successfull" })
})

app.listen(port,(req,res)=>{
    DB()
    .then(()=> console.log('Database Connected Successfully'))
    .catch((error) => console.log('Connection Failed'))
    console.log(`Server running at port ${port}`)
})