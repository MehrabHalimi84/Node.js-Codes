const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/playground')
    .then(() => console.log('Connected to MongoDB...'))
    .catch(err => console.error('Could not connect to MongoDB...', err));

const courseSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        minlength: 5,
        maxlength: 255,
        // match : /pattern/
        trim: true,
        lowercase: true,
        uppercase: true
    },
    category: {
        type: String,
        required: true,
        enum: ['web', 'mobile', 'network']
    },
    author: String,
    // tags: {
    //     type: Array,
    //     validate: {
    //         validator: function (v) {
    //             return v && v.length > 0;
    //         },
    //         message: 'A course should have at least one tag' // message: props => `Invalid tags: "${props.value}". You must provide at least one tag.` (better code)
    //     }
    // },
    tags: {
        type: Array,
        validate: {
            validator: async function (v) {
                await new Promise(resolve => setTimeout(resolve, 3000));
                return v && v.length > 0;
            },
            message: 'A course should have at least one tag'
        }
    },

    date: {
        type: Date,
        default: Date.now
    },
    isPublished: Boolean,
    price: {
        type: Number,
        function() { return this.isPublished },
        min: 10,
        max: 200,
        get: v => Math.round(v),
        set: v => Math.round(v)
    }
});

const Course = mongoose.model('Course', courseSchema);

// create docoument
// Most Important doc

async function createCourse() {
    const course = new Course({
        name: 'Node.js course',
        author: 'Mehrab',
        category: 'mobile',
        tags: ['backend', 'Node'],
        isPublished: true
    });
    try {
        const result = await course.save();
        console.log(result);
    }
    catch (err) {
        for (let field in err.errors) {
            console.log(err.errors[field].message);
        }
    }
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

// quering docoument

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

// counting docoument

async function getCourses() {
    const courses = await Course
        .find()
        .and([{ author: "Mehrab" }, { isPublished: true }])
        .or()
        .limit(10)
        .sort({ name: 1 })
        .countDocuments()                 // result => 2
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


// Updating Docoument(Query First)

async function updateCourse(id) {
    const course = await Course.findById(id);
    if (!course) return;

    course.isPublished = true;
    course.author = 'Another Author';

    const result = await course.save();
    console.log(result);
}

updateCourse('6876a2992b9ce00daea46dc9');



// Updating Docoument(Update First)

async function updateCourse(id) {
    const course = await Course.findByIdAndUpdate(id, {
        $set: {
            author: 'Jason',
            isPublished: false
        }
    }, { new: true })
    console.log(course)
}

updateCourse('6876a2992b9ce00daea46dc9');


// Delete Docoument


async function deleteCourse(id) {
    // const result = await Course.deleteMany({ _id: id });
    const course = await Course.findByIdAndRemove(id);
    console.log(course) // => result = null
}

deleteCourse('6876a2992b9ce00daea46dc9');

// Better Delete Function

async function deleteCourse(id) {
    const course = await Course.findById(id);
    if (!course) return console.log("Course not found.");

    const deleted = await Course.findByIdAndRemove(id);
    console.log("Deleted:", deleted);
}