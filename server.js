const express = require('express');
const mongoose = require('mongoose');
const config = require('config');
const path = require('path');

const app = express();

//bodyParser Middleware
app.use(express.json());

// db config
const db = config.get('mongoURI');

// connect to mongo
mongoose.connect(db, { 
    useNewUrlParser: true, 
    useCreateIndex:true,
    useUnifiedTopology: true 
})
.then(() => {console.log('mongoDB Connected...')})
.catch(err => {console.log(err)});

// use routes
app.use('/api/items', require('./routes/api/item'));
app.use('/api/users', require('./routes/api/users'));
app.use('/api/auth', require('./routes/api/auth'));

// serv static asset if in production
if(process.env.NODE_ENV === 'production') {
    // set static folder
    app.use(express.static('client/build'));

    app.get('*', (res, req) => {
        res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
    })
}


const port = process.env.PORT || 5000;


app.listen(port, () => {console.log(`server is connect to port: ${port}`)});