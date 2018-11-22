process.env.URI = 'mongodb://root:m1ndp1ngood!@dds-2ze452a25bebf4b4-pub.mongodb.rds.aliyuncs.com:3717/admin'

const { connectDB } = require('../lib/db')
const Bundle = require('../models/Bundle')
const Dialog = require('../models/Dialog')
const ChatItem = require('../models/ChatItem')

const run = async () => {
  await connectDB(async () => {
    let name = '20181122.xls'
    let newName = '20181121.xls'

    bundle = await Bundle.findOne({ name })
    dialogs = await Dialog.find({ bundle: name })

    bundle.name = newName
    await bundle.save()
    for (let d of dialogs) {
      d.bundle = newName
      d.name = d.name.replace(name, newName)
      await d.save()
    }

    console.log(bundle)
    console.log(dialogs.length)
  })
}

run().then()