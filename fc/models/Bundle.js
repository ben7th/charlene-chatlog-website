const mongoose = require('mongoose')
const { Schema } = mongoose

// 一个导入批次是一个 bundle（一个 excel 文件）
const bundleSchema = new Schema({
  name: String
})

module.exports = mongoose.model('Bundle', bundleSchema)