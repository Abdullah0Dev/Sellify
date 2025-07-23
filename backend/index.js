require('dotenv').config();
const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose')
const ProductsRoutes = require('./routes/products.js')
/**
  models: for the schema DB
  controllers: for the get|post|patch|delete actions
  routes: for the routing system using express
 */

const app = express();

// middleware
app.use(cors());
app.get("/", (req, res) => {
    res.send("السلام عليكم ورحمه الله وبركاته")
})
app.use(express.json());

app.use((req, res, next) => {
    console.log(req.path, req.method)
    next()
  })

  
//  Routes
app.use('/api/products', ProductsRoutes)
  
//* this is a sample one -> change your own in the .env
const DB_URI = process.env.MONGODB_URL || 'mongodb+srv://webminds:webminds@cluster0.ym3s3qz.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0'

// Connect to MongoDB database using Mongoose
mongoose.connect(DB_URI)
    .then(() => {
        console.log('connected to database')
        app.listen(4000, () => {
            console.log('CONNECTED && Listing on http://localhost:4000:');
        })
    })
    .catch((err) => {
        console.log(err);
    })
  