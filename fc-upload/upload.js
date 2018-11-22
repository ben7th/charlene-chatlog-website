const OSS = require('ali-oss')

const ossClient = new OSS({
  "region": "oss-cn-shenzhen",
  "bucket": "charlene-chatlog",
  "accessKeyId": process.env.OSS_KEY,
  "accessKeySecret": process.env.OSS_SECRET
})

const readExcelFileData = require('./lib/readExcelFileData')
const saveExcelDataToDB = require('./lib/saveExcelDataToDB')

const upload = async (filename, filedata) => {
  let filekey = `upload/${filename}`
  await ossClient.put(filekey, filedata)

  let excelData = readExcelFileData(filedata)
  return await saveExcelDataToDB(filename, excelData)
}

module.exports = upload