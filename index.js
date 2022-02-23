const express = require('express')
const app = express()
const mongoose  = require('mongoose')
const PORT =5000
const {MONGOURI} = require('./config/keys')
const fs = require('fs');

mongoose.connect(MONGOURI,{
    useNewUrlParser:true,
    useUnifiedTopology: true

})
mongoose.connection.on('connected',()=>{
    console.log("conneted to mongo yeahh")
})
mongoose.connection.on('error',(err)=>{
    console.log("err connecting",err)
})

require('./models/user')
require('./models/post')

app.use(express.json())
app.use(require('./routes/auth'))
app.use(require('./routes/post'))
app.use(require('./routes/user'))
app.use(require('./routes/admin'))


app.listen(PORT,()=>{
    console.log("server is running on",PORT)
})

app.get('/admin', (req, res, next)=>{
    fs.readFile('uploads/admin.html', (err, data) => {
        if (err) throw err;
        res.write(data);
        res.end();
    });
});
