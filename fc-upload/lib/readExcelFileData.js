const Excel = require('xlsx')

const readExcelFileData = (filedata) => {
  let workbook = Excel.read(filedata)

  const sheetNames = workbook.SheetNames
  const sheet = workbook.Sheets[sheetNames[0]]
  let data = Excel.utils.sheet_to_json(sheet, { blankrows: true })
  return data
}

module.exports = readExcelFileData