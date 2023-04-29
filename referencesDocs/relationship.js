//Trade off between query performance vs consistency


// Using References (Normalization) -- > CONSISTENCY

let author = {
    name: 'Prasad'
}

let course =  {
    author: 'id',

}
//Using Embedded Documents (Denormalization) --> PERFORMANCE

let courseD = {
    author: {
        name: 'prasad'
    }
}

// Hybrid

let authorD = {
    name: 'Prasad'
}

let CourseH= {
    author:{
        id: 'ref',
        name: 'prasad'
    }
}