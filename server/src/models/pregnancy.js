import mongoose, { Schema } from 'mongoose'

const schema = new Schema({
    state: {type: Array, required: true},
    date: {type: Number, required: true},
    aie: {type: String, required: true},
    event: {type: String, required: true},
    element: {type: String, required: true},
    user: {type: String, required: true},
    md5estructure: {type: String, required: true},
});

const Pregnancy = mongoose.model('Pregnancy', schema);

export default Pregnancy;