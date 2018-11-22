const jsonBody = require('body/json')
const Router = require('url-router')

const getBody = ({ req, resp }) => {
  return new Promise(resolve => {
    jsonBody(req, resp, (err, body) => {
      resolve({ err, body })
    })
  })
}

const respJSON = (resp, data) => {
  resp.setHeader('content-type', 'application/json')
  resp.send(JSON.stringify(data))
}

const { connectDB } = require('./db')
const Bundle = require('../models/Bundle')
const Dialog = require('../models/Dialog')
const ChatItem = require('../models/ChatItem')

module.exports = new Router([
  // 获取所有批次
  ['GET', '/bundles', async ({ req, resp, route }) => {
    let bundles
    await connectDB(async () => {
      bundles = await Bundle.find({}).sort({ _id: -1 })
    })
    respJSON(resp, { bundles })
  }],

  // 获取一个批次下的所有对话
  ['GET', '/bundle/:name', async ({ req, resp, route }) => {
    let bundleName = route.params.name
    let dialogs
    await connectDB(async () => {
      dialogs = await Dialog.find({ bundle: bundleName })
        .populate('items')
    })
    respJSON(resp, { dialogs })
  }],

  // 删除一个批次
  ['POST', '/delete-bundle/:bundleName', async ({ req, resp, route }) => {
    let { bundleName } = route.params

    let dialogs, dids
    await connectDB(async () => {
      await Bundle.deleteMany({ name: bundleName })
      dialogs = await Dialog.find({ bundle: bundleName })
      dids = dialogs.map(x => x._id)
      await Dialog.deleteMany({ bundle: bundleName })
      await ChatItem.deleteMany({ dialog: { $in: dids }})
    })
    
    respJSON(resp, { dids })
  }],

  // 给某个 chatitem 标星星
  ['POST', '/chatitem/:id/star', async ({ req, resp, route }) => {
    let itemId = route.params.id
    let { body } = await getBody({ req, resp })
    let { star } = body

    let chatitem
    await connectDB(async () => {
      chatitem = await ChatItem.findOne({ _id: itemId })
      chatitem.star = star
      await chatitem.save()
    })
    respJSON(resp, { chatitem })
  }]
])