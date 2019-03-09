import mongoose, { Schema } from 'mongoose'

const schema = new Schema({
    name: {type: String, required: true, max: 100},
    price: {type: Number, required: true},
});

const Pregnancy = mongoose.model('Pregnancy', schema);

export default Pregnancy;