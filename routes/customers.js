const express = require('express');
const router = express.Router();
const { Customer, validate} = require('../models/customers')

router.get('/', async(req, res)=>{
      const customers = await Customer
      .find()
      .sort('name');
      res.send(customers);
})

router.post('/', async (req, res) => {  /*      60fa82f1ce88012a1cfa63b0*/
    const {error} = validate(req.body)
    if(error) 
        res.status(400).send(error.details[0].message);
        let customers = new Customer({
            name: req.body.name,
            isVip: req.body.isVip,
            phone: req.body.phone
        });
    
   


        customers = await customers.save();

res.status(201).send(customers);
});


router.get('/:id', async (req, res)=> {
    let customers = await Customer.findById(req.params.id);
    if(!customers)
    return res.status(404).send('Berilgan Idga teng malumot topilmadi');
    res.send(customers);
});


router.put('/:id', async (req, res)=>{
    const { error } = validate(req.body)
    if (error)
        return res.status(404).send(error.details[0].message);

        let customers = await Customer.findByIdAndUpdate(req.params.id, { name: req.body.name , phone: req.body.phone }, {
            new: true
        });
        if(!customers)
            return res.status(404).send('Berilgan Idiga teng topilmadi...');
            res.send(customers);
        
    
});


router.delete('/:id', async (req, res)=>{
     let customers = await Customer.findByIdAndRemove(req.params.id);
    if(!customers)
    return res.status(404).send('Berilgan Idga teng malumot topilmadi');
    
    res.send(customers);
});




module.exports = router;