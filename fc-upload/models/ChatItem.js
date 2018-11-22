const mongoose = require('mongoose')
const { Schema } = mongoose

// 一条对话
const chatItemSchema = new Schema({
  dialog: {
    type: Schema.Types.ObjectId, ref: 'Dialog'
  },
  time: Date,
  sender: String,
  receiver: String,
  mtype: String,
  mtext: String,
  filename: String
})

module.exports = mongoose.model('ChatItem', chatItemSchema)