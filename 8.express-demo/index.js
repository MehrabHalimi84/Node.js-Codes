const express = require('express');
const app = express();


const courses = [
    { id: 1, name: 'course1' },
    { id: 2, name: 'course2' },
    { id: 3, name: 'course3' },
    { id: 4, name: 'course4' },
    { id: 5, name: 'course5' }
]

app.get('/', (req, res) => {
    res.send('Hello World!!!!!');
});

app.get('/api/courses', (req, res) => {
    res.send(courses);
});

// app.get('/api/courses/:id', (req, res) => {
//     res.send(req.params.id)
// });
// این خط ایدی که داخل یو ار ال نوشته میشه رو برمیگردونه

app.get('/api/posts/:years/:month', (req, res) => {
    res.send({
        params: req.params,
        query: req.query
    });
    // res.send(req.query);
});


app.get('/api/courses/:id', (req, res) => {
    const course = courses.find(c => c.id === parseInt(req.params.id));
    if (!course) res.status(404).send('The course with the given ID was not found!');
    res.send(course);

});
const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Listening on port ${port}...`));




// app.get();
// app.post();
// app.put;
// app.delete();