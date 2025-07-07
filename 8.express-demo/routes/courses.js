const express = require('express');
const router = express.Router();
const Joi = require('joi');

const courses = [
    { id: 1, name: 'course1' },
    { id: 2, name: 'course2' },
    { id: 3, name: 'course3' },
    { id: 4, name: 'course4' },
    { id: 5, name: 'course5' }
]

router.get('/', (req, res) => {
    res.send(courses);
});

// app.get('/api/courses/:id', (req, res) => {
//     res.send(req.params.id)
// });
// این خط ایدی که داخل یو ار ال نوشته میشه رو برمیگردونه

router.get('/api/posts/:years/:month', (req, res) => {
    res.send({
        params: req.params,
        query: req.query
    });
    // res.send(req.query);
});

router.post('/', (req, res) => {
    const result = validateInput(req.body)
    // این خط کد میاد الگوی صحیح اسکیما رو با چیزی که پست شده مقایسه میکنه اگه درست بود حروجیش undifind 
    if (result.error) return res.status(400).send(result.error.details[0].message);
    // و در نهایت اگر خروجی ارور داشت ارور رو سند کنه

    const course = {
        id: courses.length + 1,
        name: req.body.name
    }
    courses.push(course);
    res.send(course);
});

router.get('/:id', (req, res) => {
    const course = courses.find(c => c.id === parseInt(req.params.id));
    if (!course) return res.status(404).send('The course with the given ID was not found!');
    res.send(course);

});


router.put('/:id', (req, res) => {
    const course = courses.find(c => c.id === parseInt(req.params.id));
    if (!course) return res.status(404).send('The course with the given ID was not found!');


    const result = validateInput(req.body);
    if (result.error) return res.status(400).send(result.error.details[0].message);

    course.name = req.body.name;
    res.send(course);
});

function validateInput(course) {
    const schema = {
        name: Joi.string().min(3).required()
    }
    return Joi.validate(course, schema);
}


router.delete('/:id', (req, res) => {
    const course = courses.find(c => c.id === parseInt(req.params.id));
    if (!course) return res.status(404).send('The course with the given ID was not found!');

    const index = courses.indexOf(course);
    courses.splice(index, 1);
    res.send(course);
});

module.exports = router;