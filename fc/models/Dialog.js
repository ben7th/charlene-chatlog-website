const mongoose = require('mongoose')
const { Schema } = mongoose

// 对话
// 两个人对话
// 或者一群人在群组里对话
const dialogSchema = new Schema({
  bundle: String, // 批次（excel 文件名）
  name: String, // 对话名称 批次-下标
  type: String, // 对话类型 single | group
  group: String, // 对话组标识
  items: [
    { type: Schema.Types.ObjectId, ref: 'ChatItem' }
  ]
})

module.exports = mongoose.model('Dialog', dialogSchema)