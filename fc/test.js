require('./env')

const { connectDB } = require('./lib/db')
const Bundle = require('./models/Bundle')
const Dialog = require('./models/Dialog')
const ChatItem = require('./models/ChatItem')

const run = async () => {
  let bundleName = 'temp1111.xls'
  await connectDB(async () => {
    await Bundle.deleteMany({ name: bundleName })
    dialogs = await Dialog.find({ bundle: bundleName })
    dids = dialogs.map(x => x._id)
    await Dialog.deleteMany({ bundle: bundleName })
    await ChatItem.deleteMany({ dialog: { $in: dids }})
  })
}

run().then()