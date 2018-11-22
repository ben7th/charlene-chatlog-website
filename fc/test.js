require('./env')

const { connectDB } = require('./lib/db')
const Bundle = require('./models/Bundle')
const Dialog = require('./models/Dialog')
const ChatItem = require('./models/ChatItem')

const run = async () => {
  await connectDB(async () => {
    dialog = await Dialog.findOne({ _id: '5bf56864a7c7d1000ccbe2c6' })
    console.log(dialog)
  })
}

run().then()