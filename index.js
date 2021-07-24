const express = require('express');
const app = express();
const mongoose = require('mongoose');
const categoreisRoute = require('./routes/categoreis');
const customersRoute = require('./routes/customers');
const coursesRoute = require('./routes/courses');

mongoose.connect('mongodb://localhost/virtualdars', {useNewUrlParser: true, useUnifiedTopology: true})
.then(()=> {
    console.log('Mongodbga ulanish hosil qilindi...');
})

.catch((err)=>{
    console.error('Mongodbga ulanishda xato...', err)
});

mongoose.set('useFindAndModify', false);
app.use(express.json());
app.use('/api/categoreis', categoreisRoute)
app.use('/api/customers', customersRoute)
app.use('/api/courses', coursesRoute)




const port = process.env.PORT || 7000;

app.listen(port, ()=>{
    console.log(`${port} port is connect`);
})