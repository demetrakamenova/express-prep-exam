const mongoose = require('mongoose');
//const bcrypt = require('bcrypt');
const Schema = mongoose.Schema;
const Model = mongoose.model;
const { String, Number, Boolean, ObjectId } = Schema.Types;

//const saltRounds = 10;

const courseSchema = new Schema({

    title: {
        type: String,
        required: true,
       // unique: true,
    },

    description: {
        type: String,
        required: true,
    },

    imageUrl: {
        type: String,
        required: true,
    },

    isPublic: {
        type: Boolean,
        required: true,
    },

    createdAt: {
        type: Date,
        default: Date.now,
    },

    users:  [{
            type: ObjectId,
            ref: 'User',
        }],

    creator: {
        type: ObjectId,
        required: true,
    }
    
});



module.exports = new Model('Course', courseSchema);