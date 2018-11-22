const Dialog = require('../models/Dialog')
const ChatItem = require('../models/ChatItem')
const Bundle = require('../models/Bundle')

const { connectDB } = require('./db')

const buildDialog = (bundle, d, idx) => {
  let name = `${bundle}-${idx}`
  let type
  let group
  let d0 = d[0]
  if (d0['收信人'].includes('group:')) {
    type = 'group'
    group = d0['收信人']
  } else {
    type = 'single'
    group = [d0['发信人'], d0['收信人']].sort().join('+')
  }

  return new Dialog({ bundle, name, type, group })
}

const buildItem = (dialogId, x) => {
  let time = new Date(`${x['北京时间']}+0800`)
  let sender = x['发信人']
  let receiver = x['收信人']
  let mtype = x['消息类型']
  let mtext = x['消息正文']
  let filename = x['文件名']

  return new ChatItem({ dialog: dialogId, time, sender, receiver, mtype, mtext, filename })
}

const saveToDB = async (_dialogs, bundleName) => {
  let re1
  let re2

  await connectDB(async () => {
    let bundle = new Bundle({ name: bundleName })    
    let dialogs = []
    let items = []

    let idx = 0
    for (let d of _dialogs) {
      idx ++
      let dialog = buildDialog(bundleName, d, idx)
      let _items = d.map(x => buildItem(dialog._id, x))

      dialog.items = _items
      dialogs.push(dialog)

      items = items.concat(_items)
    }

    let re0 = await bundle.save()
    re1 = await Dialog.insertMany(dialogs)
    console.log(`imported ${ re1.length } dialogs`)
    re2 = await ChatItem.insertMany(items)
    console.log(`imported ${ re2.length } items`)
  })

  return { dialogs: re1.length, items: re2.length, raw: _dialogs.length }
}

const getDialogsFrom = (data) => {
  let dialogs = []
  let dialog = []

  data.forEach(x => {
    if (Object.keys(x).length == 0) {
      dialogs.push(dialog)
      dialog = []
    } else {
      dialog.push(x)
    }
  })

  return dialogs
}

module.exports = async (bundleName, excelData) => {
  let _dialogs = getDialogsFrom(excelData)
  return await saveToDB(_dialogs, bundleName)
}