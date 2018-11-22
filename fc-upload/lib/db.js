let mongoose = require('mongoose')

module.exports = {
  connectDB: async (callback) => {
    await mongoose.connect(process.env.URI, { 
      useNewUrlParser: true,
      dbName: 'charlene-chatlog'
    })
  
    await callback()
  
    mongoose.connection.close()
  }
}