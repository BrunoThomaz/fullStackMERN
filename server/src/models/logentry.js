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
    nivel: String,
    comments: String,
    image: String,
    rating: {
        type: Number,
        min: [0,'The worst location ever'],
        max: [10, "Your best location ever!"],
        default : 0,
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