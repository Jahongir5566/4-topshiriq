const express = require('express');
const router = express.Router();
const { Category, validate} = require('../models/categoreis')



router.get('/', async(req, res)=>{
      const categoreis = await Category
      .find()
      .sort('name');
      res.send(categoreis);
})

router.post('/', async (req, res) => {
    const {error} = validate(req.body)
    if(error) 
        res.status(400).send(error.details[0].message);
        let category = new Category({
            name: req.body.name
        });
    
   


category = await category.save();

res.status(201).send(category);
});


router.get('/:id', async (req, res)=> {
    let category = await Category.findById(req.params.id);
    if(!category)
    return res.status(404).send('Berilgan Idga teng malumot topilmadi');
    res.send(category);
});


router.put('/:id', async (req, res)=>{
    const { error } = validate(req.body)
    if (error)
        return res.status(404).send(error.details[0].message);

        let category = await Category.findByIdAndUpdate(req.params.id, { name: req.body.name }, {
            new: true
        });
        if(!category)
            return res.status(404).send('Berilgan Idiga teng topilmadi...');
            res.send(category);
        
    
});


router.delete('/:id', async (req, res)=>{
     let category = await Category.findByIdAndRemove(req.params.id);
    if(!category)
    return res.status(404).send('Berilgan Idga teng malumot topilmadi');
    
    res.send(category);
});




module.exports = router;