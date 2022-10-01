const express=require('express');
const path=require('path');
const logger=require('./middlewares/logger');

const app=express();

// Papka static qilingan
app.use(express.static(path.join(__dirname,'public')))

// Logger middlewares
app.use(logger);

// Body parser
app.use(express.json())
app.use(express.urlencoded({extended:false}))

// Books API CRUD endpoints
app.use('/api/books',require('./routes/books'))

// Customers API CRUD
app.use('/customers',require('./routes/customers'))

// Rentalinfo 
app.use('/rentalinfo',require('./routes/rentalinfo'))

const PORT=process.env.PORT || 4000;    
app.listen(PORT,()=>console.log(`server listening on port ${PORT}`));

