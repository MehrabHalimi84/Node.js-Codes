const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/playground')
    .then(() => console.log('Connected to MongoDB...'))
    .catch(err => console.error('Could not connect to MongoDB...', err));

const courseSchema = new mongoose.Schema({
    name: String,
    author: String,
    tags: [String],
    date: { type: Date, default: Date.now },
    isPublished: Boolean
});

const Course = mongoose.model('Course', courseSchema);

// create ducoument

async function createCourse() {
    const course = new Course({
        name: 'Node.js Course',
        author: 'Mehrab',
        tags: ['node', 'backend'],
        isPublished: true
    });

    const result = await course.save();
    console.log(result);

}

createCourse()

async function createCourse() {
    const course = new Course({
        name: 'React Course',
        author: 'Mehrab',
        tags: ['React', 'Frontend'],
        isPublished: true
    });

    const result = await course.save();
    console.log(result);

}

//quering ducoument

async function getCourses() {
    const courses = await Course
        .find({ author: 'Mehrab', isPublished: true })
        .limit(10)
        .sort({ name: 1 })
        .select({ name: 1, tags: 1 });
    console.log(courses);
}

createCourse();

// comparison query


async function getCourses() {
    // eq (equal)
    // ne (not equal)
    // gt (greater than)
    // gte(greater than or equal to)
    // lt (less than)
    // lte(less than or equal to)
    // in
    // nin(not in )


    const courses = await Course
        // .find({ price: { $gt: 10 } })
        // .find({ price: { $gte: 10, lte: 20 } })
        .find({ price: { $in: [10, 20, 30, 50] } })
        .limit(10)
        .sort({ name: 1 })
        .select({ name: 1, tags: 1 });
    console.log(courses);
}

// Logical Query

async function getCourses() {
    const courses = await Course
        .find()
        .and([{ author: "Mehrab" }, { isPublished: true }])
        .or()
        .limit(10)
        .sort({ name: 1 })
        .select({ name: 1, tags: 1 });
    console.log(courses);
}


getCourses();

// Regular Expressions

async function getCourses() {
    const courses = await Course
        // Starts with Mehrab
        .find({ author: /^Mehrab/ })
        // Ends with Halimi
        .find({ author: /Halimi$/i })
        // Contains Mosh
        .find({ author: /.*mehrab.*/i })
        .limit(10)
        .sort({ name: 1 })
        .select({ name: 1, tags: 1 });
    console.log(courses);
}

//counting ducoument 

async function getCourses() {
    const courses = await Course
        .find()
        .and([{ author: "Mehrab" }, { isPublished: true }])
        .or()
        .limit(10)
        .sort({ name: 1 })
        .count()                  // result => 2
    console.log(courses);
}


// Pagination


async function getCourses() {
    const pageNumber = 2;
    const pageSize = 10;

    const courses = await Course
        .find({ author: 'Mehrab', isPublished: true })
        .skip((pageNumber - 1) * pageSize)
        .limit(pageSize)
        .sort({ name: 1 })
        .select({ name: 1, tags: 1 });
    console.log(courses);
}