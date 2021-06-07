const mongoose = require('mongoose');

const { Schema } = mongoose;

const requiredNumber = {
    type: Number,
    required: true,
};

const logEntrySchema = new Schema({
    operadora: {
        type: String,
        required: true,
    },
    nivel: {
        type: String,
        required: true,
    },
    comments: String,
    image: String,
    googleId:{ 
        type: String, 
        required:true,
    },
    latitude: {
        ...requiredNumber,
        min: -90,
        max: 90,
    },
    longitude: {
        ...requiredNumber,
        min: -180,
        max: 180,
    },
    visitDate: {
        required: true,
        type: Date,
        default: Date.now,
    }        

},
{
    timestamps: true,
});



module.exports = mongoose.model('LogEntry', logEntrySchema);