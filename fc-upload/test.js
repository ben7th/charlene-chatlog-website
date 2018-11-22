require('./env')
const upload = require('./upload')

const test = () => {
  upload('tmp', 'abc').then(() => {
    console.log('ok')
  })
}

const fs = require('fs')
const readExcelFileData = require('./lib/readExcelFileData')
const saveExcelDataToDB = require('./lib/saveExcelDataToDB')

const testReadExcel = async () => {
  let filedata = fs.readFileSync('../history/20181112.xls')
  let data = readExcelFileData(new Buffer(filedata, 'utf-8'))

  let res = await saveExcelDataToDB('aaa', data)
  console.log(res, data.length, filedata.length)
}

testReadExcel()