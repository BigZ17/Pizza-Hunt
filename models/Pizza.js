const moment = require('moment');
const { Schema, model } = require('mongoose');

const PizzaSchema = new Schema({
  pizzaName: {
    type: String,
    required: true,
    trim: true
  },
  createdBy: {
    type: String,
    required: true,
    trim: true
  },
    createdAt: {
      type: Date,
      default: Date.now,
      get: (createdAtVal) => moment(createdAtVal).format('MMM DD, YYYY [at] hh:mm a')
    },
    size: {
      type: String,
      required: true,
      enum: ['Personal', 'Small', 'Medium', 'Large', 'Extra Large'],
      default: 'Large'
    },
    toppings: [],
    comments: [
        {
          // Specifically, we need to tell Mongoose to expect an ObjectId and to tell it that its data comes from the Comment model.
          type: Schema.Types.ObjectId,
          // The ref property is especially important because it tells the Pizza model which documents to search to find the right comments.
          ref: 'Comment'
        }
      ]
},
{
    toJSON: {
      virtuals: true,
      getters: true
    },
    id: false
  }

);

// get total count of comments and replies on retrieval
PizzaSchema.virtual('commentCount').get(function() {
  return this.comments.reduce((total, comment) => total + comment.replies.length + 1, 0);
});



// create the Oizza model usign PizzaSchema
const Pizza = model('Pizza', PizzaSchema);

// exprot the Pizza model
module.exports = Pizza;
