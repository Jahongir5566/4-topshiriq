const express = require('express');
const app = express();
const mongoose = require('mongoose');
const categoreisRoute = require('./routes/categoreis');

mongoose.connect('mongodb://localhost/virtualdars', {useNewUrlParser: true, useUnifiedTopology: true})
.then(()=> {
    console.log('Mongodbga ulanish hosil qilindi...');
})

.catch((err)=>{
    console.err('Mongodbga ulanishda xato...', err)
});

mongoose.set('useFindAndModify', false);
app.use('/api/categoreis', categoreisRoute)
app.use(express.json());



const port = process.env.PORT || 5000;

app.listen(port, ()=>{
    console.log(`${port} port is connect`);
})