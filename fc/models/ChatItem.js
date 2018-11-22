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
  filename: String,
  star: Boolean, // 星星标记
})

module.exports = mongoose.model('ChatItem', chatItemSchema)