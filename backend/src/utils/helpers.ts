import fs from 'fs'
import path from 'path'

const dataFolderPath = './data'
type AnyObject = Record<string, any>
const filterObject = (obj: AnyObject, searchTerm: String): boolean => {
  let result = []
  // Check each property in the object
  for (let key in obj) {
    if (
      obj[key] &&
      obj[key].toString().toLowerCase().includes(searchTerm.toLowerCase())
    ) {
      result.push(key)
    }
  }
  // Return true if any property contains the searched text
  return result.length > 0
}

export function getData<T>(filePath: string): Result<T> {
  return {
    data: JSON.parse(
      fs.readFileSync(path.join(dataFolderPath, filePath), 'utf-8')
    ),
  }
}

// export const getData = (filePath: string) => {
//   return JSON.parse(
//     fs.readFileSync(path.join(dataFolderPath, filePath), 'utf-8')
//   )
// }

export const filterData = (data: any[], searchTerm: string) => {
  return data.filter((item: any[]) => filterObject(item, searchTerm))
}
