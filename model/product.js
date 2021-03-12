const {Schema, model} = require('mongoose');

const ProductSchema = Schema({
    name: {type: String, required: [true, "name is mandatory"]},
    state: {type: Boolean, default: true, required: true},
    user: {type: Schema.Types.ObjectId, ref: 'User', required: true},
    price: {type: Number, default: 0},
    category: {type: Schema.Types.ObjectId, ref: 'Category', required: true},
    description: {type: String},
    available: {type: Boolean, default: true}
});
ProductSchema.methods.toJSON = function () {
    const {__v, state,_id, ...rest} = this.toObject();
    rest.uid = _id;
    return rest;
}
module.exports = model('Product', ProductSchema);
