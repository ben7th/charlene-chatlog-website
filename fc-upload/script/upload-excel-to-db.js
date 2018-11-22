require('../env')

const args = require('args')
args.option('input', '输入文件')

const readExcel = require('../lib/readExcel')
const saveExcelDataToDB = require('../lib/saveExcelDataToDB')

const run = async ({ inputPath }) => {
  let excelData = readExcel(inputPath)
  let bundleName = inputPath.split('/').pop()
  await saveExcelDataToDB(bundleName, excelData)
}

const options = args.parse(process.argv)
let inputPath = options.input

if (inputPath) {
  run({ inputPath }).then()
} else {
  args.showHelp()
}