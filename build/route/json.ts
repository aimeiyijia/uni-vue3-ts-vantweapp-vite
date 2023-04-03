import fs from 'fs'
import path from 'path'

// process.env.UNI_INPUT_DIR
export function getJson(jsonFileName, filePath) {
  const jsonFilePath = path.resolve(filePath, jsonFileName)
  if (!fs.existsSync(jsonFilePath)) {
    throw new Error(jsonFilePath + ' 不存在')
  }
  try {
    return fs.readFileSync(jsonFilePath, 'utf8').toString()
  } catch (e) {
    console.error(e + ' 解析失败')
    return ''
  }
}
