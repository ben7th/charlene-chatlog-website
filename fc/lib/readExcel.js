const Excel = require('xlsx')

const readExcel = (f) => {
  console.log('read:', f)
  let workbook = Excel.readFile(f)

  const sheetNames = workbook.SheetNames
  const sheet = workbook.Sheets[sheetNames[0]]
  let data = Excel.utils.sheet_to_json(sheet, { blankrows: true })
  return data
}

module.exports = readExcel