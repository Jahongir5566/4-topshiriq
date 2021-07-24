const { Course , validate} = require('../models/courses')
const { Category } = require('../models/categoreis')
const mongoose = require('mongoose');
const express = require('express');
const router = express.Router();



router.get('/', async(req, res)=>{
    const courses = await Course.find().sort('title');
    res.send(courses);
})




router.post('/', async(req, res)=>{
   
    const { error } = validate(req.body);
    if(error){
        return res.status(400).send(error.details[0].massage);
    }

    const category = await Category.findById(req.body.categoryId);
    if(!category){         
            res.status(400).send('Berilgan IDga teng malumot topilmadi...')
    };
    
    let course = new Course({
        title: req.body.title,
        category: {
            _id: category._id,
            name: category.name
        },
        trainer: req.body.trainer,
        tags: req.body.tags,
        status: req.body.status
    }, { new: true });
    course = await course.save();

});



router.put('/', async (req, res)=>{
    const { error } = validate(req.body);
    if(error){
        res.status(400).send(error.details[0].message)
    };

    const category = await Category.findById(req.body.categoryId)
    if(!category    ){
        res.status(400).send('Berilgan IDga teng malumot topilmadi2...');
    }

    const course = await Course.findByIdAndUpdate(req.params.id,
        {
        title: req.body.title,
        category: {
            _id: category._id,
            name: category.name
        },
        trainer: req.body.trainer,
        tags: req.body.tags,
        status: req.body.status
    }, { new: true });
    
    if(!course){
        res.status(400).send('Berilgan IDga teng malumot topilmadi1..')
    }

    res.send(course);
});


router.delete('/:id', async (req, res)=>{
     let course = await Course.findByIdAndRemove(req.params.id);
    if(!course)
    return res.status(404).send('Berilgan Idga teng malumot topilmadi');
    
    res.send(course);
});

router.get('/:id', async (req, res)=> {
    let course = await Course.findById(req.params.id);
    if(!course)
    return res.status(404).send('Berilgan Idga teng malumot topilmadi');
    res.send(course);
});



module.exports = router;