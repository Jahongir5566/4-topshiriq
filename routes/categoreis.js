const express = require('express');
const Joi = require('joi');
const router = express.Router();
const mongoose = require('mongoose');


const categorySchema = new mongoose.Schema({
    name:{
        type: String,
        required: true,
        minlenght: 5,
        maxlenght: 15
    }
});

const Category = mongoose.model('Category', categorySchema);

router.get('/', async(req, res)=>{
      const categoreis = await Category
      .find()
      .sort('name');
      res.send(categoreis);
})

router.post('/', async (req, res) => {

    // const validateCategory = Joi.object({ name : Joi.string().min(3).required()
    // });

    //const result = validateCategory(req.body);
    const {error} = validateCategory(req.body)
    if(error) 
        res.status(400).send(result.error.details[0].message);
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


// router.put('/:id', (req, res)=>{
//     const category = categories.find(c => c.id === parseInt(req.params.id));
//     if(!category)
//     return res.status(404).send('Berilgan Idga teng malumot topilmadi');
     
//     const categorySchema = Joi.object({ name : Joi.string().min(3).required()
//     });
//     const result = categorySchema.validate(req.body);
//     if (result.error){
//         return res.status(400).send(result.error.details[0].message)
//     };
    
//     category.name = req.body.name;
//     res.send(category);
// })


// router.delete('/:id', (req, res)=>{
//     const category = categories.find(c => c.id === parseInt(req.params.id));
//     if(!category)
//     return res.status(404).send('Berilgan Idga teng malumot topilmadi');
    
//     const categoryIndex = categories.indexOf(category);
//     categories.splice(categoryIndex, 1);
//     res.send(category);
// });



function validateCategory(category){
    const schema = Joi.object({ name : Joi.string().min(3).required()
    });
    return schema.validate(category);
}

module.exports = router;