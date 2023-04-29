
const mongoose = require('mongoose');
const express = require('express');
var app = express();


mongoose.connect('mongodb://127.0.0.1:27017/RelationDb')
    .then(() => console.log('Connected to db'))
    .catch((err) => console.error('While connecting db getting error', err));

const authorSchema = new mongoose.Schema({
    name: String,
    bio: String,
    website: String
});

const Author = mongoose.model('Author', authorSchema);

const Course = mongoose.model('Course', new mongoose.Schema({
    name: String,
    authors: [authorSchema]
    // author: {
    //     type: authorSchema,
    //     required: true
    // }
    // author: {
    //     type: mongoose.Schema.Types.ObjectId,
    //     ref: 'Author'
    // }
}));

async function createAuthor(name, bio, website){
    const author = new Author({
        name: name,
        bio: bio,
        website: website
    });

    const result = await author.save();
    console.log(result);
}

async function createCourse(name, authors){
    const course = new Course({
        name: name,
        authors: authors
    });

    const result = await course.save();

    console.log(result);
}

async function listCourses(){
    const courses = await Course
                    .find()
                    .populate('author', 'name -_id')
                    .select('name author');
    console.log(courses);
}

async function updateAuthor(courseId){
    //const course = await Course.findById(courseId);
    const course = await Course.updateOne({_id: courseId},{
        $set: {
            'author.name': 'Prasad'
        }
    });
    //course.author.name = 'Prasad Beta'
    //course.save();
}

async function addAuthor(courseId, author){
    const course = await Course.findById(courseId);
    course.authors.push(author);    
    //course.author.name = 'Prasad Beta'
    course.save();
}

async function removeAuthor(courseId, authorId){
    const course = await Course.findById(courseId);
    const author = course.authors.id(authorId);   
    course.authors.remove(author);
    course.save();
}



//createAuthor('Prasad', 'My Bio','My Site');
// createCourse('Node Js', 
// [
//     new Author({name: 'Prasad'}),
//     new Author({name: 'Satya'}),
// ]);

//addAuthor('644bcc40206d1935a3c23de6', new Author({name: 'Sai'}));

removeAuthor('644bcc40206d1935a3c23de6', '644bcc40206d1935a3c23de5');
//updateAuthor('644bc7e5a5203494aaac2de3');
//listCourses();