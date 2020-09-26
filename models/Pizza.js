const { Schema, model } = require('mongoose');

const PizzaSchema = new Schema({
    pizzaName: {
        type: String
    },
    createBy: {
        type: String
    },
    createdAt: {
        type: Date,
        default: Date.now
    },
    size: {
        type: String,
        default: 'Large'
    },
    toppings: []
});

// create the Oizza model usign PizzaSchema
const Pizza = model('Pizza', PizzaSchema);

// exprot the Pizza model
module.exports = Pizza;
