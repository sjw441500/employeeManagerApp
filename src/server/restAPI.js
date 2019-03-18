const express = require('express');
const router = require('./router');
const bodyParser = require('body-parser');
const cors = require('cors')
const app = express();
app.use(cors());
app.use(bodyParser.urlencoded({limit: '50mb', extended: true}))
app.use(bodyParser.json({limit: '50mb', extended: true}));
app.use('/api',router);
const port= 8888;



app.listen(port,() =>{
    console.log(`listen on port ${port}`);
});

